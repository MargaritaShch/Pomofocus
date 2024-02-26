import settingDOM from "./settingDOM";
const { CONFIG, timerInterval } = settingDOM();

class Timer {
  constructor() {
    this.timerInterval = null;
    this.minutes = 0;
    this.seconds = 0;
  }

  start(minutes, seconds) {
    this.minutes = minutes;
    this.seconds = seconds;
    this.timerInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stop() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }

  tick() {
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        this.stop();
        return;
      }
      this.minutes--;
      this.seconds = 59;
    } else {
      this.seconds--;
    }
  }

  getLeftTime() {
    return { minutes: this.minutes, seconds: this.seconds };
  }
}

export default Timer;
