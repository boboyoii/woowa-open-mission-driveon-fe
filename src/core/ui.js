export function makeBtn(scene, x, y, label, onClick) {
  const btn = scene.add
    .rectangle(x, y, 180, 52, 0xffffff, 1)
    .setDepth(10)
    .setInteractive({ useHandCursor: true });
  const txt = scene.add
    .text(x, y, label, {
      fontSize: '20px',
      color: '#222',
      fontFamily: 'Pretendard, sans-serif',
    })
    .setOrigin(0.5)
    .setDepth(11);

  btn.on('pointerover', () => btn.setScale(1.05));
  btn.on('pointerout', () => btn.setScale(1.0));
  btn.on('pointerdown', () => {
    btn.setScale(0.98);
    onClick();
  });
  return { btn, txt };
}

export function addOverlayMask(scene, depth = 5) {
  const { width: W, height: H } = scene.scale;
  return scene.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.7).setDepth(depth);
}
