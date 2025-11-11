import { preloadCarImage, preloadRoadImages, roadKey } from '../core/assets.js';
import { ASSET, GAME_CONFIG, SCENE } from '../core/constants.js';
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

    this.currentRoadIndex = 1;
    this.bg = this.add.image(W / 2, H / 2, roadKey(this.currentRoadIndex));

    this.bg.setDisplaySize(W, H).setDepth(-10);

    this.time.addEvent({
      delay: GAME_CONFIG.road.swapMs,
      loop: true,
      callback: () => {
        this.currentRoadIndex++;
        if (this.currentRoadIndex > GAME_CONFIG.road.count)
          this.currentRoadIndex = 1;
        this.bg.setTexture(roadKey(this.currentRoadIndex));
      },
    });

    this.player = new Player(this, W / 2, H * 0.85, ASSET.CAR, this.playerName);

    this.cursors = this.input.keyboard.createCursorKeys();

    // [테스트용] 5초 뒤 결과 화면으로 자동 전환
    this.time.delayedCall(5000, () => {
      this.input.keyboard.enabled = false;

      if (this.bgTimer) this.bgTimer.remove(false);

      this.scene.start('ResultScene', {
        playerName: this.playerName,
        roadIndex: this.currentRoadIndex,
        carX: this.player.sprite.x,
        carY: this.player.sprite.y,
      });
    });
  }

  update() {
    if (this.cursors.left.isDown)
      this.player.sprite.x -= GAME_CONFIG.player.moveSpeed;
    if (this.cursors.right.isDown)
      this.player.sprite.x += GAME_CONFIG.player.moveSpeed;

    const W = this.scale.width;
    const half = this.player.sprite.displayWidth / 2;
    const roadLeft = W * GAME_CONFIG.road.leftRatio;
    const roadRight = W * GAME_CONFIG.road.rightRatio;

    this.player.sprite.x = Phaser.Math.Clamp(
      this.player.sprite.x,
      roadLeft + half + GAME_CONFIG.road.clampMargin,
      roadRight - half - GAME_CONFIG.road.clampMargin
    );
  }
}
