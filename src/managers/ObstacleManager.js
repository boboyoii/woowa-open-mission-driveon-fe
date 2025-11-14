import { ASSET, GAME_CONFIG } from '../core/constants.js';

export default class ObstacleManager {
  constructor(scene, roadBounds) {
    this.scene = scene;
    this.roadBounds = roadBounds;

    this.obstacleGroup = this.scene.physics.add.group({
      immovable: false,
      allowGravity: false,
    });

    this.startCreateObstacles();
  }

  startCreateObstacles() {
    const interval = GAME_CONFIG.obstacle.createInterval;

    this.createObstacleTimer = this.scene.time.addEvent({
      delay: interval,
      loop: true,
      callback: this.createObstacle,
      callbackScope: this,
    });
  }

  createObstacle() {
    const obstacleKeys = Object.values(ASSET.OBSTACLE);
    const obstacleKey = Phaser.Utils.Array.GetRandom(obstacleKeys);

    const { left, right } = this.roadBounds;
    const margin = GAME_CONFIG.road.clampMargin;
    const padding = 20;

    const randomX = Phaser.Math.Between(
      left + margin + padding,
      right - margin - padding
    );
    const startY = -50;

    const obstacle = this.obstacleGroup
      .create(randomX, startY, obstacleKey)
      .setScale(1.35)
      .setActive(true)
      .setVisible(true);

    const speedY = GAME_CONFIG.obstacle.speedY;
    obstacle.body.setVelocity(0, speedY);
  }

  removeObstacles() {
    const H = this.scene.scale.height;

    this.obstacleGroup.children.iterate((obstacle) => {
      if (!obstacle) return;

      const isOffScreen =
        obstacle.active && obstacle.y - obstacle.displayHeight / 2 > H + 20;
      if (isOffScreen) obstacle.destroy();
    });
  }
}
