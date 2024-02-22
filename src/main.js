import "./style.scss";
import "./pomodoro-timer.scss";
import "./short-break-timer.scss";
import "./long-break-timer.scss";
import Timer from "./Modules/timer.js";
import settingDOM from "./Modules/settingDOM.js";
import taskTableManage from "./Modules/taskTableManage.js";
import correctTaskTableManage from "./Modules/correctTaskTable.js";

document.addEventListener("DOMContentLoaded", function () {
  let timerInterval;
  const {
    body,
    pomodoroButton,
    shortBreakButton,
    longBreakButton,
    minuteId,
    secondId,
    startBtn,
    CONFIG,
    saveTimeAndTheme,
  } = settingDOM();

  //save theme and time from local storage
  getSavedThemeAndTime();

  function getSavedThemeAndTime() {
    const savedThemeAnadTime = JSON.parse(localStorage.getItem("themeAndTime"));
    if (savedThemeAnadTime) {
      const { theme, time } = savedThemeAnadTime;
      changeColor(theme);

      let min = document.getElementById("min");
      let sec = document.getElementById("sec");
      min.textContent = time.toString().padStart(2, "0");
      sec.textContent = "00";

      return time;
    } else {
      return null;
    }
  }

  //change color on breaks
  function changeColor(themeClass) {
    body.classList.remove(
      "pomodoro-timer",
      "short-break-timer",
      "long-break-timer"
    );
    //save color
    body.classList.add(themeClass);
  }

  //сchange breaks
  function findIndex(key) {
    const theme = CONFIG[key].class;
    const time = CONFIG[key].time;
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");
    min.textContent = time.toString().padStart(2, "0");
    sec.textContent = "00";
    changeColor(theme);
    changeColor(theme);
    clearInterval(timerInterval);
    timerInterval = null;
    saveTimeAndTheme(theme, time);
  }

  //click Pomodoro
  pomodoroButton.addEventListener("click", function () {
    findIndex("POMODORO");
    reseetingTimer();  
  });
  //click Short Break
  shortBreakButton.addEventListener("click", function () {
    findIndex("SHORT_BREAK");
    reseetingTimer();
  });
  //click Long Breack
  longBreakButton.addEventListener("click", function () {
    findIndex("LONG_BREAK");
    reseetingTimer();
  });

  //TIMER
  const savedTime = getSavedThemeAndTime();
  const timer = new Timer(minuteId, secondId, savedTime);

  //click START and launch timer
  startBtn.addEventListener("click", function () {
    if (!timer.timerInterval) {
      timer.start();
    } else {
      timer.stop();
    }
    console.log("Start button clicked");
  });

  //reset timer when chenge themes
  function reseetingTimer() {
    if (timer) {
      timer.stop();
    }
  }

  //manage table task
  taskTableManage();
  correctTaskTableManage()
});
