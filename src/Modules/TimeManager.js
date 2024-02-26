class TimeManager {
    constructor(minuteId, secondId) {
      this.minuteId = minuteId;
      this.secondId = secondId;
    }
  
    updateTime(time) {
      const min = document.getElementById(this.minuteId);
      const sec = document.getElementById(this.secondId);
      min.textContent = time.toString().padStart(2, "0");
      sec.textContent = "00";
    }
  }
  
  export default TimeManager;