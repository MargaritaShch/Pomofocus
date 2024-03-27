//Subject
class Timer {
  constructor() {
    this.observers = []; //список наблюдателей
    this.timerInterval = null;
    this.minutes = 0;
    this.seconds = 0;
    //все время в мс
    this.totalTime = 0; 
    //прошедшее время
    this.elapsedTime = 0; 
  }
  subscribe(observer) {
    this.observers.push(observer)//подписка на наблюдателей
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(item => item !== observer)//отписка от наблюдателей
  }

  notifyObserver({minutes,seconds,percentComplete}) {
    this.observers.forEach(observer => {
      if (typeof observer.update === 'function') {
        observer.update({ minutes, seconds, percentComplete});
      } else {
        console.error('Observer without update method:', observer);
      }
    });
  }

  //проверка на запуск таймера
  isRunning(){
    return this.timerInterval !== null
  }

  start(milliseconds) {
    if (this.timerInterval !== null) return;
    this.totalTime = milliseconds;
    this.elapsedTime = 0;
    this.minutes = Math.floor(milliseconds / 60000);
    this.seconds = (milliseconds % 60000) / 1000;
    this.timerInterval = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
   
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
    this.elapsedTime += 1000;
    const percentComplete = (this.elapsedTime / this.totalTime) * 100;
    this.notifyObserver({ minutes: this.minutes, seconds: this.seconds, percentComplete  });
 }
}


export default Timer;
