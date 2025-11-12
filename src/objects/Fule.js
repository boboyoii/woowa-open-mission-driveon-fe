export default class Fuel {
  constructor(max, drainPerSec) {
    this.max = max;
    this.current = max;
    this.drainPerSec = drainPerSec;
  }

  addFuel(amount) {
    this.current = Math.min(this.max, this.current + amount);
  }

  consume(dt) {
    this.current = Math.max(0, this.current - this.drainPerSec * dt);
  }

  ratio() {
    return this.current / this.max;
  }

  hasFuel() {
    return this.current > 0;
  }
}
