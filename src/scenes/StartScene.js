import '../style.css';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  preload() {
    this.load.image('start_bg', 'assets/start_bg.jpg');
    this.load.image('input_box', 'assets/input_box.jpg');
    this.load.image('btn_start', 'assets/btn_start.jpg');
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.bg = this.add.image(W / 2, H / 2, 'start_bg');
    this.bg.setDisplaySize(W, H);

    this.inputBox = this.add.image(W / 2, H * 0.55, 'input_box');
    this.inputBox.setScale(0.25);

    this.nameInput = this.add.dom(W / 2.15, H * 0.54, 'input');

    const el = this.nameInput.node;
    el.setAttribute('type', 'text');
    el.setAttribute('placeholder', '닉네임 입력');
    el.classList.add('nickname-input');

    const btn = this.add.image(W / 2, H * 0.75, 'btn_start');
    btn.setScale(0.7);
    btn.setInteractive({ useHandCursor: true });

    btn.on('pointerdown', () => {
      const playerName = this.nameInput.node.value.trim();
      if (!playerName) {
        alert('이름을 입력해주세요!');
        return;
      }

      this.scene.start('GameScene', { playerName });
    });

    btn.on('pointerover', () => btn.setScale(0.8));
    btn.on('pointerout', () => btn.setScale(0.7));
    btn.on('pointerdown', () => btn.setScale(0.65));
    btn.on('pointerup', () => btn.setScale(0.8));
  }
}
