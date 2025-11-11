import { ASSET, GAME_CONFIG, SCENE } from '../core/constants.js';
import { addOverlayMask, makeBtn } from '../core/ui.js';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super(SCENE.RESULT);
  }

  init(data) {
    this.playerName = data.playerName;
    this.roadKey = data.roadKey;
    this.carX = data.carX;
    this.carY = data.carY;
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.bg = this.add.image(W / 2, H / 2, this.roadKey).setDisplaySize(W, H);

    this.car = this.add
      .image(this.carX, this.carY, ASSET.CAR)
      .setScale(GAME_CONFIG.player.scale);

    addOverlayMask(this);

    this.add
      .text(W / 2, H * 0.32, 'GAME OVER', {
        fontSize: '48px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        fontFamily: 'Pretendard, sans-serif',
      })
      .setOrigin(0.5)
      .setDepth(10);

    makeBtn(W / 2 - 110, H * 0.6, 'HOME', () => {
      this.scene.start(SCENE.HOME);
    });

    this.add.text(20, 20, this.playerName, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Pretendard, sans-serif',
      stroke: '#000000',
      strokeThickness: 3,
    });
  }
}
