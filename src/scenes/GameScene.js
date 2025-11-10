export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    for (let i = 1; i <= 23; i++) {
      this.load.image(`road_${i}`, `assets/road/road_${i}.jpg`);
    }
    this.load.image('car', 'assets/car.png');
  }

  create() {
    const { width: W, height: H } = this.scale;

    this.roadLeftRatio = 0.16;
    this.roadRightRatio = 0.84;

    this.totalRoads = 23;
    this.currentRoadIndex = 1;
    this.bg = this.add.image(W / 2, H / 2, 'road_1');

    this.bg.setDisplaySize(W, H).setDepth(-10);

    this.time.addEvent({
      delay: 100,
      loop: true,
      callback: () => {
        this.currentRoadIndex++;
        if (this.currentRoadIndex > this.totalRoads) this.currentRoadIndex = 1;
        this.bg.setTexture(`road_${this.currentRoadIndex}`);
      },
    });

    this.car = this.add.image(W / 2, H * 0.85, 'car');
    this.car.setScale(0.5);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) this.car.x -= 5;
    if (this.cursors.right.isDown) this.car.x += 5;

    const W = this.scale.width;
    const half = this.car.displayWidth / 2;

    const roadLeft = W * this.roadLeftRatio;
    const roadRight = W * this.roadRightRatio;

    const margin = 2;

    this.car.x = Phaser.Math.Clamp(
      this.car.x,
      roadLeft + half + margin,
      roadRight - half - margin
    );
  }
}
