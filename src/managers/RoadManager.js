import { GAME_CONFIG } from '../core/constants.js';
import { roadKey } from '../core/assets.js';

export class RoadManager {
  constructor(scene) {
    this.scene = scene;
    this.index = 1;
  }

  initRoad() {
    const { width: W, height: H } = this.scene.scale;
    this.bg = this.scene.add
      .image(W / 2, H / 2, roadKey(this.index))
      .setDisplaySize(W, H)
      .setDepth(-10);
  }

  animateRoad() {
    this.timer = this.scene.time.addEvent({
      delay: GAME_CONFIG.road.swapMs,
      loop: true,
      callback: () => {
        this.index = (this.index % GAME_CONFIG.road.count) + 1;
        this.bg.setTexture(roadKey(this.index));
      },
    });
  }

  getRoadIndex() {
    return this.index;
  }

  getBounds() {
    const W = this.scene.scale.width;
    return {
      left: W * GAME_CONFIG.road.leftRatio,
      right: W * GAME_CONFIG.road.rightRatio,
    };
  }
}
