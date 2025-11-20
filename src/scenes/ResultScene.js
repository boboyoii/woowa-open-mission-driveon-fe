import { SCENE } from '../core/constants.js';
import { addOverlayMask, makeBtn } from '../core/ui.js';

export default class ResultScene extends Phaser.Scene {
  constructor() {
    super(SCENE.RESULT);
  }

  init(data) {
    this.screenshot = data.screenshot;
    this.playerName = data.playerName;
    this.finalDistance = data.finalDistance;
  }

  preload() {
    if (this.textures.exists('screenshot')) this.textures.remove('screenshot');

    if (this.screenshot) this.load.image('screenshot', this.screenshot);
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.drawBackground(W, H);
    this.drawHeader(W, H);
    this.drawPlayerName(W, H);
    this.drawFinalDistance(W, H);

    makeBtn(this, W / 2, H * 0.65, 'HOME', () => {
      this.scene.start(SCENE.HOME);
    });

    makeBtn(this, W / 2, H * 0.75, 'RESTART', () => {
      this.scene.start(SCENE.PLAY, {
        playerName: this.playerName,
      });
    });

    makeBtn(this, W / 2, H * 0.85, 'RANKING', () => {
      this.scene.start(SCENE.RANKING, {
        from: SCENE.RESULT,
        playerRecord: {
          screenshot: this.screenshot,
          playerName: this.playerName,
          finalDistance: this.finalDistance,
        },
      });
    });
  }

  drawBackground(W, H) {
    this.add.image(W / 2, H / 2, 'screenshot').setDisplaySize(W, H);
    addOverlayMask(this);
  }

  drawHeader(W, H) {
    this.add
      .text(W / 2, H * 0.22, 'GAME OVER', {
        fontSize: '50px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 7,
        fontFamily: 'Pretendard, sans-serif',
      })
      .setShadow(2, 3, '#000000', 4)
      .setOrigin(0.5)
      .setDepth(10);
  }

  drawPlayerName(W, H) {
    this.add
      .text(W / 2, H * 0.32, 'PLAYER', {
        fontSize: '25px',
        color: '#cccccc',
        fontFamily: 'Pretendard, sans-serif',
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.add
      .text(W / 2, H * 0.37, this.playerName, {
        fontSize: '30px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 5,
        fontFamily: 'Pretendard, sans-serif',
      })
      .setOrigin(0.5)
      .setDepth(10);
  }

  drawFinalDistance(W, H) {
    this.add
      .text(W / 2, H * 0.47, 'DISTANCE', {
        fontSize: '25px',
        color: '#cccccc',
        fontFamily: 'Pretendard, sans-serif',
      })
      .setOrigin(0.5)
      .setDepth(10);

    this.add
      .text(W / 2, H * 0.52, `${this.finalDistance} m`, {
        fontSize: '34px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 8,
        fontFamily: 'Pretendard, sans-serif',
      })
      .setOrigin(0.5)
      .setDepth(10);
  }
}
