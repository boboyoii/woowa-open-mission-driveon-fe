export default class Fuel {
  constructor(max, drainPerSec) {
    this.max = max;
    this.current = max;
    this.drainPerSec = drainPerSec;
  }

  add(amount) {
    this.current = Math.min(this.max, this.current + amount);
  }

  consumeByTime(dt) {
    this.current = Math.max(0, this.current - this.drainPerSec * dt);
  }

  consume(amount) {
    this.current = Math.max(0, this.current - amount);
  }

  ratio() {
    return this.current / this.max;
  }

  hasFuel() {
    return this.current > 0;
  }
}
