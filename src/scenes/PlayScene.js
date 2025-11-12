import {
  preloadCarImage,
  preloadObstacleImages,
  preloadRoadImages,
} from '../core/assets.js';
import { ASSET, GAME_CONFIG, SCENE } from '../core/constants.js';
import ObstacleManager from '../managers/ObstacleManager.js';
import { RoadManager } from '../managers/RoadManager.js';
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
    preloadRoadImages(this, GAME_CONFIG.road.count);
    preloadCarImage(this);
    preloadObstacleImages(this);
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.roadManager = new RoadManager(this);
    this.roadManager.initRoad();
    this.roadManager.animateRoad();

    this.player = new Player(this, W / 2, H * 0.85, ASSET.CAR, this.playerName);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.roadBounds = this.roadManager.getBounds();
    this.obstacleManager = new ObstacleManager(this, this.roadBounds);
    this.obstacleManager.startCreateObstacles();

    this.physics.add.collider(
      this.player.car,
      this.obstacleManager.obstacleGroup,
      () => console.log('충돌'),
      null,
      this
    );
  }

  update() {
    this.player.clampToRoad(this.roadBounds);
    this.player.moveByInput(this.cursors);

    this.obstacleManager.removeObstacles();
  }
}
