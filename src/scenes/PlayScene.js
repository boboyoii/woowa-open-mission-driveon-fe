import { preloadCarImage, preloadRoadImages } from '../core/assets.js';
import { ASSET, GAME_CONFIG, SCENE } from '../core/constants.js';
import { RoadManager } from '../managers/RoadManager.js';
import Player from '../objects/Player.js';

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super(SCENE.PLAY);
  }

  init(data) {
    this.input.keyboard.enabled = true;
    this.playerName = data.playerName;
  }

  preload() {
    preloadRoadImages(this, GAME_CONFIG.road.count);
    preloadCarImage(this);
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.roadManager = new RoadManager(this);
    this.roadManager.initRoad();
    this.roadManager.animateRoad();

    this.player = new Player(this, W / 2, H * 0.85, ASSET.CAR, this.playerName);

    this.cursors = this.input.keyboard.createCursorKeys();

    // [테스트용] 5초 뒤 결과 화면으로 자동 전환
    this.time.delayedCall(5000, () => {
      this.input.keyboard.enabled = false;

      if (this.bgTimer) this.bgTimer.remove(false);

      this.scene.start('ResultScene', {
        playerName: this.playerName,
        roadIndex: this.roadManager.getRoadIndex(),
        carX: this.player.car.x,
        carY: this.player.car.y,
      });
    });
  }

  update() {
    if (this.cursors.left.isDown)
      this.player.car.x -= GAME_CONFIG.player.moveSpeed;
    if (this.cursors.right.isDown)
      this.player.car.x += GAME_CONFIG.player.moveSpeed;

    const { left: roadLeft, right: roadRight } = this.roadManager.getBounds();
    const half = this.player.car.displayWidth / 2;

    this.player.car.x = Phaser.Math.Clamp(
      this.player.car.x,
      roadLeft + half + GAME_CONFIG.road.clampMargin,
      roadRight - half - GAME_CONFIG.road.clampMargin
    );
  }
}
