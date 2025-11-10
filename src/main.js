import Phaser from 'phaser';
import GameScene from './scenes/GameScene.js';
import StartScene from './scenes/StartScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 640,
  height: 800,
  scene: [StartScene, GameScene],
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  dom: { createContainer: true },
  audio: { noAudio: true },
};

new Phaser.Game(config);
