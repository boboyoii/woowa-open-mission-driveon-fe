export default class Player {
  constructor(scene, x, y, texture, nickname) {
    this.scene = scene;
    this.nickname = nickname;

    this.sprite = scene.add.image(x, y, texture).setScale(0.5);

    this.nameText = scene.add.text(20, 20, nickname, {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Pretendard, sans-serif',
      stroke: '#000000',
      strokeThickness: 3,
    });
  }
}
