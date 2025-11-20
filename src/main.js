import Phaser from 'phaser';
import HomeScene from './scenes/HomeScene.js';
import PlayScene from './scenes/PlayScene.js';
import ResultScene from './scenes/ResultScene.js';
import RankingScene from './scenes/RankingScene.js';

const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 640,
  height: 800,
  scene: [HomeScene, PlayScene, ResultScene, RankingScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,
  },
  dom: { createContainer: true },
  audio: { noAudio: true },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
