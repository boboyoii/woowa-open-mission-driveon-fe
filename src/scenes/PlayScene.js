import {
  preloadCarImage,
  preloadFuelItem,
  preloadObstacleImages,
  preloadRoadImages,
} from '../core/assets.js';
import { ASSET, GAME_CONFIG, SCENE } from '../core/constants.js';
import FuelManager from '../managers/FuelManager.js';
import ObstacleManager from '../managers/ObstacleManager.js';
import { RoadManager } from '../managers/RoadManager.js';
import Player from '../objects/Player.js';
import DistanceText from '../ui/DistanceText.js';
import FuelBar from '../ui/FuelBar.js';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super(SCENE.PLAY);
    this.isGameOver = false;
  }

  init(data) {
    this.isGameOver = false;
    this.input.keyboard.enabled = true;
    this.playerName = data.playerName;
  }

  preload() {
    preloadRoadImages(this, GAME_CONFIG.road.count);
    preloadCarImage(this);
    preloadObstacleImages(this);
    preloadFuelItem(this);
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.roadManager = new RoadManager(this);
    this.roadManager.initRoad();
    this.roadManager.animateRoad();

    this.player = new Player(this, W / 2, H * 0.85, ASSET.CAR, this.playerName);
    this.fuelBar = new FuelBar(this, 20, 20);
    this.distanceUI = new DistanceText(this);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.roadBounds = this.roadManager.getBounds();

    this.obstacleManager = new ObstacleManager(this, this.roadBounds);
    this.physics.add.overlap(
      this.player.car,
      this.obstacleManager.obstacleGroup,
      this.handleObstacleHit,
      null,
      this
    );

    this.fuelManager = new FuelManager(this, this.roadBounds);
    this.physics.add.overlap(
      this.player.car,
      this.fuelManager.fuelItemgroup,
      this.handleFuelGain,
      null,
      this
    );
  }

  update(_, delta) {
    const dtSec = delta / 1000;
    this.player.updateDistance(dtSec);

    const meters = this.player.getDistanceInMeters();
    this.distanceUI.update(meters);

    this.player.clampToRoad(this.roadBounds);
    this.player.moveByInput(this.cursors);

    this.player.updateFuel(dtSec);
    const ratio = this.player.fuel.ratio();
    this.fuelBar.setRatio(ratio);

    if (!this.player.fuel.hasFuel() && !this.isGameOver) {
      this.isGameOver = true;

      this.time.delayedCall(200, async () => {
        await this.saveRecord();
        this.goToResultScene();
      });
    }

    this.obstacleManager.removeObstacles();
  }

  handleObstacleHit(_, obstacle) {
    if (obstacle.body) obstacle.body.enable = false;

    this.player.hitObstacle(GAME_CONFIG.obstacle.damage);
    this.fuelBar.setRatio(this.player.fuel.ratio());
    this.fuelBar.showDamage(GAME_CONFIG.obstacle.damage);

    this.cameras.main.shake(50, 0.02);

    this.tweens.add({
      targets: obstacle,
      alpha: 0,
      duration: 120,
      onComplete: () => obstacle.destroy(),
    });
  }

  handleFuelGain(_, fuel) {
    if (fuel.body) fuel.body.enable = false;

    this.player.gainFuel(GAME_CONFIG.fuel_item.gainAmount);
    this.fuelBar.setRatio(this.player.fuel.ratio());
    this.fuelBar.showGain(GAME_CONFIG.fuel_item.gainAmount);

    this.tweens.add({
      targets: fuel,
      alpha: 0,
      duration: 120,
      onComplete: () => fuel.destroy(),
    });
  }

  async saveRecord() {
    const record = {
      playerName: this.player.getName(),
      distance: this.player.getDistanceInMeters(),
    };

    try {
      const res = await fetch('http://localhost:8080/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });

      console.log(res);
    } catch (err) {
      console.error('기록 저장 중 오류:', err);
    }
  }

  goToResultScene() {
    this.game.renderer.snapshot((image) => {
      const dataURL = image.src;

      this.scene.start(SCENE.RESULT, {
        screenshot: dataURL,
        playerName: this.player.getName(),
        finalDistance: this.player.getDistanceInMeters(),
      });
    });
  }
}
