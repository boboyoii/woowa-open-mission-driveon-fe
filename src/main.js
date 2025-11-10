import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';
import StartScene from './scenes/StartScene.js';
import GameOverScene from './scenes/GameOverScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 640,
  height: 800,
  scene: [StartScene, GameScene, GameOverScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,
  },
  dom: { createContainer: true },
  audio: { noAudio: true },
};

new Phaser.Game(config);
