import { SCENE } from '../core/constants';

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

    this.car = this.add.image(this.carX, this.carY, 'car').setScale(0.5);

    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.35).setDepth(5);

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

    const makeBtn = (x, y, label, onClick) => {
      const btn = this.add
        .rectangle(x, y, 180, 52, 0xffffff, 1)
        .setDepth(10)
        .setInteractive({ useHandCursor: true });
      const txt = this.add
        .text(x, y, label, {
          fontSize: '20px',
          color: '#222',
          fontFamily: 'Pretendard, sans-serif',
        })
        .setOrigin(0.5)
        .setDepth(11);

      btn.on('pointerover', () => btn.setScale(1.05));
      btn.on('pointerout', () => btn.setScale(1.0));
      btn.on('pointerdown', () => {
        btn.setScale(0.98);
        onClick();
      });
      return { btn, txt };
    };

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
