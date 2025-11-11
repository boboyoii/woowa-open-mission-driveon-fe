import { ASSET, SCENE } from '../core/constants';
import '../style.css';

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super(SCENE.HOME);
  }

  preload() {
    this.load.image(ASSET.START_BG, 'assets/start_bg.jpg');
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.bg = this.add.image(W / 2, H / 2, ASSET.START_BG);
    this.bg.setDisplaySize(W, H);

    this.nameInput = this.add.dom(W / 2.15, H * 0.54, 'input');

    const el = this.nameInput.node;
    el.setAttribute('type', 'text');
    el.setAttribute('placeholder', '닉네임 입력');
    el.classList.add('nickname-input');

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

    makeBtn(W / 2, H * 0.75, 'START', () => {
      const playerName = this.nameInput.node.value.trim();
      if (!playerName) {
        alert('이름을 입력해주세요!');
        return;
      }

      this.scene.start(SCENE.PLAY, { playerName });
    });
  }
}
