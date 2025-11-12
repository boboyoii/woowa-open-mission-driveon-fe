import { SCENE } from '../core/constants.js';
import { addOverlayMask, makeBtn } from '../core/ui.js';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super(SCENE.RESULT);
  }

  init(data) {
    this.screenshot = data.screenshot;
  }

  preload() {
    if (this.textures.exists('screenshot')) this.textures.remove('screenshot');

    if (this.screenshot) this.load.image('screenshot', this.screenshot);
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.add.image(W / 2, H / 2, 'screenshot').setDisplaySize(W, H);

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

    makeBtn(this, W / 2 - 110, H * 0.6, 'HOME', () => {
      this.scene.start(SCENE.HOME);
    });
  }
}
