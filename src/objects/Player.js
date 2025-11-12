import { GAME_CONFIG } from '../core/constants.js';
import Fuel from './Fuel.js';

export default class Player {
  constructor(scene, x, y, texture, nickname) {
    this.scene = scene;
    this.nickname = nickname;

    this.car = scene.physics.add
      .image(x, y, texture)
      .setScale(GAME_CONFIG.player.scale)
      .setImmovable(false);

    const { max, drainPerSec } = GAME_CONFIG.fuel;
    this.fuel = new Fuel(max, drainPerSec);

    this.nameText = scene.add
      .text(20, 45, nickname, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Pretendard, sans-serif',
        stroke: '#000000',
        strokeThickness: 3,
      })
      .setDepth(1000);

    this.nameWidth = this.nameText.displayWidth;
  }

  moveByInput(key) {
    const speed = GAME_CONFIG.player.moveSpeed;

    if (key.left.isDown) this.car.x -= speed;
    if (key.right.isDown) this.car.x += speed;
  }

  clampToRoad(roadBounds) {
    const { left, right } = roadBounds;
    const W = this.scene.scale.width;
    const half = this.car.displayWidth / 2;

    this.car.x = Phaser.Math.Clamp(
      this.car.x,
      left + half + GAME_CONFIG.road.clampMargin,
      right - half - GAME_CONFIG.road.clampMargin
    );
  }

  updateFuel(sec) {
    this.fuel.consumeByTime(sec);
  }

  hitObstacle(damage) {
    this.fuel.consume(damage);
  }
}
