import { GAME_CONFIG } from '../core/constants.js';
import Fuel from './Fuel.js';

export default class Player {
  constructor(scene, x, y, texture, name) {
    this.scene = scene;
    this.name = name;

    this.car = this.createCar(x, y, texture);
    this.nameText = this.createNameText(name);

    this.initPlayState();
  }

  createCar(x, y, texture) {
    return this.scene.physics.add
      .image(x, y, texture)
      .setScale(GAME_CONFIG.player.scale)
      .setImmovable(false);
  }

  createNameText(name) {
    return this.scene.add
      .text(20, 45, name, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Pretendard, sans-serif',
        stroke: '#000000',
        strokeThickness: 3,
      })
      .setDepth(1000);
  }

  initPlayState() {
    const { max, drainPerSec } = GAME_CONFIG.fuel;
    this.fuel = new Fuel(max, drainPerSec);
    this.distance = 0;
  }

  getName() {
    return this.name;
  }

  getDistanceInMeters() {
    return Math.floor(this.distance / 50);
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

  updateFuel(dtSec) {
    this.fuel.consumeByTime(dtSec);
  }

  hitObstacle(damage) {
    this.fuel.consume(damage);
  }

  gainFuel(amount) {
    this.fuel.refuel(amount);
  }

  updateDistance(dtSec) {
    const speed = GAME_CONFIG.obstacle.speedY;
    this.distance += speed * dtSec;
  }
}
