import { ASSET, GAME_CONFIG } from '../core/constants.js';

export default class FuelManager {
  constructor(scene, roadBounds) {
    this.scene = scene;
    this.roadBounds = roadBounds;

    this.fuelItemgroup = scene.physics.add.group({
      immovable: false,
      allowGravity: false,
    });

    this.startCreateFuelItems();
  }

  startCreateFuelItems() {
    const interval = GAME_CONFIG.fuel_item.createInterval;

    this.scene.time.addEvent({
      delay: interval,
      loop: true,
      callback: this.createFuelItem,
      callbackScope: this,
    });
  }

  createFuelItem() {
    const { left, right } = this.roadBounds;
    const margin = GAME_CONFIG.road.clampMargin;
    const padding = 20;

    const randomX = Phaser.Math.Between(
      left + margin + padding,
      right - margin - padding
    );
    const startY = -50;

    const fuelItem = this.fuelItemgroup
      .create(randomX, startY, ASSET.FUEL_ITEM)
      .setScale(0.8)
      .setActive(true)
      .setVisible(true);

    fuelItem.body.setVelocityY(GAME_CONFIG.fuel_item.speedY);
  }

  removeFuels() {
    const H = this.scene.scale.height;

    this.fuelItemgroup.children.iterate((fuel) => {
      if (!fuel) return;
      if (fuel.y > H + 50) {
        fuel.destroy();
      }
    });
  }
}
