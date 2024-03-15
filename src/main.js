import "./style.scss";
import "./pomodoro-timer.scss";
import "./short-break-timer.scss";
import "./long-break-timer.scss";
import Timer from "./Modules/Timer.js";
import settingDOM from "./Modules/settingDOM.js";
import ThemeManager from "./Modules/ThemeManager.js";
import TimeDisplay  from "./Modules/TimeDisplay.js";
import TaskTableManager from "./Modules/taskTableManager.js";


document.addEventListener("DOMContentLoaded", function () {
  // const timer = new Timer(minuteId, secondId);
  // const timerManager = new TimeManager(minuteId, secondId);
  const timer = new Timer()
  const timerDisplay = new TimeDisplay("min","sec")
  timer.subscribe(timerDisplay)
  // let timerInterval;
  const {
    body,
    pomodoroButton,
    shortBreakButton,
    longBreakButton,
    // minuteId,
    // secondId,
    startBtn,
    CONFIG,
    saveTimeAndTheme,
  } = settingDOM();

  // const taskTableManager = new TaskTableManager();// ???
  const themeManager = new ThemeManager(body);
 


  //save theme and time from local storage
    const savedThemeAndTime = JSON.parse(localStorage.getItem("themeAndTime"));
    if (savedThemeAndTime) {
      const {theme, time} = savedThemeAndTime;
      themeManager.changeTheme(theme);
      // const minutes = time
      // const seconds = 0
      timerDisplay.update({minutes: parseInt(time), seconds: 0});
  }

    //click Pomodoro
    pomodoroButton.addEventListener("click", function () {
      const theme = CONFIG.POMODORO.class;
      const time = CONFIG.POMODORO.time;
      themeManager.changeTheme(theme);
      timerDisplay.update({minutes: time, seconds: 0});
      // timer.start(time, 1); 
      timer.stop();
      saveTimeAndTheme(theme, time);
    });

    //click Short Break
    shortBreakButton.addEventListener("click", function () {
      const theme = CONFIG.SHORT_BREAK.class;
      const time = CONFIG.SHORT_BREAK.time;
      themeManager.changeTheme(theme);
      timerDisplay.update({minutes: time, seconds: 0});
      // timer.start(time, 1); 
      timer.stop();
      saveTimeAndTheme(theme, time);
    });

    //click Long Break
    longBreakButton.addEventListener("click", function () {
      const theme = CONFIG.LONG_BREAK.class;
      const time = CONFIG.LONG_BREAK.time;
      themeManager.changeTheme(theme);
      timerDisplay.update({minutes: time, seconds: 0});
      // timer.start(time, 1); 
      timer.stop();
      saveTimeAndTheme(theme, time);
    });
  
    //reset timer when chenge themes ???
  //   function reseetingTimer() {
  //     if (timer) {
  //       timer.stop();
  //     }
  //  }

   //click START and launch timer
    startBtn.addEventListener("click", function () {
      if (!timer.timerInterval) {
        timer.start();
      } else {
        timer.stop();
      }
      console.log("start: clicked");
    });
});
