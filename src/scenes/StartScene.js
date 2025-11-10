import '../style.css';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super('StartScene');
  }

  preload() {
    this.load.image('start_bg', 'assets/start_bg.jpg');
    this.load.image('input_box', 'assets/input_box.jpg');
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
  }
}
