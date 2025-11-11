import { SCENE } from '../core/constants.js';

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
    for (let i = 1; i <= 23; i++) {
      this.load.image(`road_${i}`, `assets/road/road_${i}.jpg`);
    }
    this.load.image('car', 'assets/car.png');
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.roadLeftRatio = 0.16;
    this.roadRightRatio = 0.84;

    this.totalRoads = 23;
    this.currentRoadIndex = 1;
    this.bg = this.add.image(W / 2, H / 2, 'road_1');

    this.bg.setDisplaySize(W, H).setDepth(-10);

    this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        this.currentRoadIndex++;
        if (this.currentRoadIndex > this.totalRoads) this.currentRoadIndex = 1;
        this.bg.setTexture(`road_${this.currentRoadIndex}`);
      },
    });

    this.player = new Player(this, W / 2, H * 0.85, 'car', this.playerName);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) this.player.sprite.x -= 5;
    if (this.cursors.right.isDown) this.player.sprite.x += 5;

    const W = this.scale.width;
    const half = this.player.sprite.displayWidth / 2;
    const roadLeft = W * this.roadLeftRatio;
    const roadRight = W * this.roadRightRatio;
    const margin = 2;

    this.player.sprite.x = Phaser.Math.Clamp(
      this.player.sprite.x,
      roadLeft + half + margin,
      roadRight - half - margin
    );
  }
}
