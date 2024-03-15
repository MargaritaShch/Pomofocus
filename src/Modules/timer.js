import settingDOM from "./settingDOM";
const { CONFIG, timerInterval } = settingDOM();
//Subject
class Timer {
  constructor() {
    this.observers = []; //список наблюдателей
    this.timerInterval = null;
    this.minutes = 0;
    this.seconds = 0;
  }
  subscribe(observer) {
    this.observers.push(observer)//подписка на наблюдателей
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(item => item !== observer)//отписка от наблюдателей
  }

  notifyObserver(data) {
    this.observers.forEach(observer => observer.update(data))//оповещение наблюдателей
    console.log(data)
  }

  start(minutes, seconds) {
    if (this.timerInterval !== null) return;
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
    this.notifyObserver({ minutes: this.minutes, seconds: this.seconds });
  }
}

export default Timer;
