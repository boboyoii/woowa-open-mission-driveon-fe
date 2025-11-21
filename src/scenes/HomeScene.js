import { preloadHomeBGImage } from '../core/assets.js';
import { ASSET, SCENE } from '../core/constants.js';
import { makeBtn } from '../core/ui.js';
import '../style.css';
import { validatePlayerName } from '../utils/validation.js';

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super(SCENE.HOME);
  }

  preload() {
    preloadHomeBGImage(this);
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.bg = this.add.image(W / 2, H / 2, ASSET.HOME_BG);
    this.bg.setDisplaySize(W, H);

    this.nameInput = this.add.dom(W / 2.18, H * 0.54, 'input');

    const el = this.nameInput.node;
    el.setAttribute('type', 'text');
    el.setAttribute('placeholder', '닉네임 입력');
    el.classList.add('nickname-input');

    makeBtn(this, W / 2, H * 0.75, 'START', () => {
      const inputName = this.nameInput.node.value;
      const result = validatePlayerName(inputName);

      if (!result.isValid) {
        alert(result.errorMessage);
        return;
      }

      this.scene.start(SCENE.PLAY, { playerName: result.playerName });
    });

    makeBtn(this, W / 2, H * 0.85, 'RANKINGS', () => {
      this.scene.start(SCENE.RANKING, { from: SCENE.HOME });
    });
  }
}
