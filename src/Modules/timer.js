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
    this.observers.forEach(observer => observer.update({ minutes: this.minutes, seconds: this.seconds }))//оповещение наблюдателей
   
  }

  start(minutes, seconds) {
    if (this.timerInterval !== null) return;
    this.minutes = Number(minutes);
    this.seconds = Number(seconds);

    if (isNaN(this.minutes) || isNaN(this.seconds)) {
      console.error("Неверное значение времени:", minutes, seconds);
      return;
  }

    console.log("Таймер запущен:", this.minutes, "минут", this.seconds, "секунд");
    this.timerInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stop() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    console.log("Таймер остановлен");
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
    console.log("Тик таймера:", this.minutes, "минут", this.seconds, "секунд"); 
    this.notifyObserver({ minutes: this.minutes, seconds: this.seconds });
 }
}


export default Timer;
