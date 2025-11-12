import {
  preloadCarImage,
  preloadObstacleImages,
  preloadRoadImages,
} from '../core/assets.js';
import { ASSET, GAME_CONFIG, SCENE } from '../core/constants.js';
import ObstacleManager from '../managers/ObstacleManager.js';
import { RoadManager } from '../managers/RoadManager.js';
import Player from '../objects/Player.js';
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
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.roadManager = new RoadManager(this);
    this.roadManager.initRoad();
    this.roadManager.animateRoad();

    this.player = new Player(this, W / 3, H * 0.85, ASSET.CAR, this.playerName);

    this.fuelBar = new FuelBar(this, 20, 20);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.roadBounds = this.roadManager.getBounds();
    this.obstacleManager = new ObstacleManager(this, this.roadBounds);
    this.obstacleManager.startCreateObstacles();

    this.physics.add.overlap(
      this.player.car,
      this.obstacleManager.obstacleGroup,
      this.handleObstacleHit,
      null,
      this
    );
  }

  update(_, delta) {
    const sec = delta / 1000;

    this.player.clampToRoad(this.roadBounds);
    this.player.moveByInput(this.cursors);

    this.player.updateFuel(sec);
    const ratio = this.player.fuel.ratio();
    this.fuelBar.setRatio(ratio);

    if (!this.player.fuel.hasFuel()) {
      console.log('게임 끝');
    }

    this.obstacleManager.removeObstacles();
  }

  handleObstacleHit(_, obstacle) {
    if (obstacle.body) obstacle.body.enable = false;

    this.player.hitObstacle(GAME_CONFIG.fuel.collisionDamage);
    this.fuelBar.setRatio(this.player.fuel.ratio());
    this.cameras.main.shake(50, 0.02);

    this.tweens.add({
      targets: obstacle,
      alpha: 0,
      duration: 120,
      onComplete: () => obstacle.destroy(),
    });
  }
}
