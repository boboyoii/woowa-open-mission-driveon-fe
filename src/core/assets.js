import { ASSET } from './constants.js';

export const roadKey = (i) => `${ASSET.ROAD_PREFIX}${i}`;

export function preloadRoadImages(scene, count) {
  for (let i = 1; i <= count; i++) {
    scene.load.image(roadKey(i), `assets/road/${ASSET.ROAD_PREFIX}${i}.jpg`);
  }
}

export function preloadCarImage(scene) {
  scene.load.image(ASSET.CAR, 'assets/car.png');
}

export function preloadHomeBGImage(scene) {
  scene.load.image(ASSET.HOME_BG, 'assets/home_bg.jpg');
}
