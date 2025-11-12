import { GAME_CONFIG } from '../core/constants.js';

export default class FuelBar {
  constructor(scene, x, y) {
    const BAR = GAME_CONFIG.fuel.bar;

    this.width = BAR.width;
    this.height = BAR.height;
    this.radius = BAR.radius;
    this.depth = BAR.depth;
    this.colors = BAR.colors;

    this.scene = scene;

    this.createFuelBar(x, y);
  }

  createFuelBar(x, y) {
    this.container = this.scene.add.container(x, y).setDepth(this.depth);

    this.background = this.scene.add.graphics();
    this.background.fillStyle(this.colors.bg, 1);
    this.background.fillRoundedRect(0, 0, this.width, this.height, this.radius);

    this.foreground = this.scene.add.graphics();

    this.container.add([this.background, this.foreground]);

    this.setRatio(1);
  }

  setRatio(ratio) {
    const r = Phaser.Math.Clamp(ratio, 0, 1);

    let fill = this.colors.good;
    if (r < 0.3) fill = this.colors.low;
    else if (r < 0.6) fill = this.colors.warn;

    const w = this.width * r;

    const safeRadius = Math.min(this.radius, this.height / 2, w / 2);

    this.foreground.clear();
    this.foreground.fillStyle(fill, 1);
    this.foreground.fillRoundedRect(0, 0, w, this.height, safeRadius);

    return this;
  }
}
