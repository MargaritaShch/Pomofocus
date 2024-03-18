class TimeDisplay {
    constructor(minuteId, secondId) {
      this.minuteElem = document.getElementById(minuteId);
      this.secondElem = document.getElementById(secondId);
    }
  
    update(time) {
        this.minuteElem.textContent = time.minutes.toString().padStart(2, "0");
        this.secondElem.textContent = time.seconds.toString().padStart(2, "0");
    }
  }
  
export default TimeDisplay;