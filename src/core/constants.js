export const SCENE = {
  HOME: 'HomeScene',
  PLAY: 'PlayScene',
  RESULT: 'ResultScene',
};

export const ASSET = {
  CAR: 'car',
  HOME_BG: 'home_bg',
  ROAD_PREFIX: 'road_',
  OBSTACLE: {
    CONE: 'cone',
    BARREL: 'barrel',
    CRASH_CAR: 'crash_car',
    HOLE: 'hole',
  },
};

export const GAME_CONFIG = {
  road: {
    count: 23,
    leftRatio: 0.16,
    rightRatio: 0.84,
    clampMargin: 2,
    swapMs: 100,
  },
  player: {
    scale: 0.4,
    moveSpeed: 5,
  },
  obstacle: {
    createInterval: 900,
    speedY: 300,
  },
  fuel: {
    max: 100,
    drainPerSec: 3,
    collisionDamage: 15,
    bar: {
      width: 290,
      height: 18,
      radius: 6,
      depth: 1000,

      colors: {
        bg: 0x1f1f1f,
        good: 0x7fffd4,
        warn: 0xffd166,
        low: 0xff5c8a,
      },
    },
  },
};
