import { ASSET, SCENE } from '../core/constants.js';
import { makeBtn, addOverlayMask } from '../core/ui.js';

export default class RankingScene extends Phaser.Scene {
  constructor() {
    super(SCENE.RANKING);
  }

  init(data) {
    this.from = data.from ?? SCENE.MAIN;
    this.playerRecord = data.playerRecord ?? null;

    this.rankings = [];
  }

  async create() {
    const { width: W, height: H } = this.scale;

    this.bg = this.add.image(W / 2, H / 2, ASSET.HOME_BG);
    this.bg.setDisplaySize(W, H);

    addOverlayMask(this, 0);

    this.add
      .text(W / 2, H * 0.12, 'RANKINGS', {
        fontSize: '40px',
        fontFamily: 'Pretendard',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    this.rankings = await this.fetchRankings();
    this.drawTable(W, H);

    makeBtn(this, W / 2, H * 0.9, 'BACK', () => {
      if (this.playerRecord) {
        this.scene.start(this.from, this.playerRecord);
      } else {
        this.scene.start(this.from);
      }
    });
  }

  async fetchRankings() {
    try {
      const res = await fetch(
        'https://woowa-open-mission-driveon-be-production.up.railway.app/api/records/rankings'
      );
      const data = await res.json();

      return data.map((record, idx) => ({
        rank: idx + 1,
        name: record.playerName,
        distance: record.distance,
        playedAt: record.playedAt,
      }));
    } catch (err) {
      console.error('랭킹 조회 실패:', err);
      return [];
    }
  }

  drawTable(W, H) {
    const tableWidth = W * 0.8;
    const rowHeight = 47;
    const startY = H * 0.2;

    const left = W * 0.1;
    const colWidth = tableWidth / 4;

    this.colCenters = [
      left + colWidth * 0.4,
      left + colWidth * 1.3,
      left + colWidth * 2.4,
      left + colWidth * 3.4,
    ];

    this.drawTableHeader(W, H, startY, tableWidth, rowHeight);
    this.drawTableRows(W, H, startY, tableWidth, rowHeight);
  }

  drawTableHeader(W, H, startY, tableWidth, rowHeight) {
    const left = W * 0.1;

    const header = this.add.graphics();
    header.fillStyle(0x4db6ac);
    header.fillRoundedRect(left, startY, tableWidth, rowHeight, 12);

    const headerStyle = {
      fontSize: '22px',
      fontFamily: 'Pretendard',
      color: '#ffffff',
    };

    this.add
      .text(this.colCenters[0], startY + 12, 'RANK', headerStyle)
      .setOrigin(0.5, 0);
    this.add
      .text(this.colCenters[1], startY + 12, 'NAME', headerStyle)
      .setOrigin(0.5, 0);
    this.add
      .text(this.colCenters[2], startY + 12, 'SCORE', headerStyle)
      .setOrigin(0.5, 0);
    this.add
      .text(this.colCenters[3], startY + 12, 'DATE', headerStyle)
      .setOrigin(0.5, 0);
  }

  drawTableRows(W, H, startY, tableWidth, rowHeight) {
    const left = W * 0.1;

    const rowTextStyle = {
      fontSize: '20px',
      fontFamily: 'Pretendard',
      color: '#ffffff',
    };

    this.rankings.forEach((item, i) => {
      const y = startY + rowHeight * (i + 1);

      const rowBg = this.add.graphics();
      rowBg.fillStyle(i % 2 === 0 ? 0x3c5268 : 0x304355, 0.97);
      rowBg.fillRect(left, y, tableWidth, rowHeight);

      this.add
        .text(this.colCenters[0], y + 12, `${item.rank}`, rowTextStyle)
        .setOrigin(0.5, 0);

      this.add
        .text(this.colCenters[1], y + 12, item.name, rowTextStyle)
        .setOrigin(0.5, 0);

      this.add
        .text(this.colCenters[2], y + 12, `${item.distance}m`, rowTextStyle)
        .setOrigin(0.5, 0);

      this.add
        .text(this.colCenters[3], y + 12, this.formatDate(item.playedAt), {
          ...rowTextStyle,
          fontSize: '18px',
        })
        .setOrigin(0.5, 0);
    });
  }

  formatDate(dateString) {
    const d = new Date(dateString);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
