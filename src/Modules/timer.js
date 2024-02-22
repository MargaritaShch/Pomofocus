// timer.js
import settingDOM from "./settingDOM";
const { CONFIG, timerInterval } = settingDOM();

class Timer {
  constructor(minuteId, secondId, savedTime) {
    this.minuteElement = document.getElementById(minuteId);
    this.secondElement = document.getElementById(secondId);
    this.timerInterval = null;
    this.minuteElement.textContent = savedTime
      ? savedTime.toString().padStart(2, "0")
      : CONFIG.POMODORO.time;
    this.secondElement.textContent = "00";
  }

  start() {
    this.timerInterval = setInterval(() => {
      let min = parseInt(this.minuteElement.textContent);
      let sec = parseInt(this.secondElement.textContent);
      sec--;
      if (sec < 0) {
        min = min - 1;
        if (min < 0) {
          clearInterval(this.timerInterval);
        }
        sec = 59;
      }
      this.minuteElement.textContent = min < 10 ? "0" + min : min;
      this.secondElement.textContent = sec < 10 ? "0" + sec : sec;
    }, 1000);
  }

  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}

export default Timer;
