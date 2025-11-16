export default class DistanceText {
  constructor(scene) {
    this.scene = scene;

    this.text = scene.add
      .text(scene.scale.width - 30, 20, '0 m', {
        fontSize: '22px',
        color: '#ffffff',
        fontFamily: 'Pretendard, sans-serif',
        stroke: '#000000',
        strokeThickness: 3,
      })
      .setOrigin(1, 0)
      .setDepth(1000);
  }

  update(meters) {
    this.text.setText(`${meters} m`);
  }
}
