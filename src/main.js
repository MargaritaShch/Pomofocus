import "./style.scss";
import "./pomodoro-timer.scss";
import "./short-break-timer.scss";
import "./long-break-timer.scss";
import Timer from "./Modules/Timer.js";
import settingDOM from "./Modules/settingDOM.js";
import ThemeManager from "./Modules/ThemeManager.js";
import TimeDisplay from "./Modules/TimeDisplay.js";
import TaskTableManager from "./Modules/TaskTableManager.js";

document.addEventListener("DOMContentLoaded", function () {
    const timer = new Timer();
    const timerDisplay = new TimeDisplay("min", "sec");
    timer.subscribe(timerDisplay);
    const {
        body,
        pomodoroButton,
        shortBreakButton,
        longBreakButton,
        startBtn,
        CONFIG,
        saveTimeAndTheme,
    } = settingDOM();
    const taskTableManager = new TaskTableManager();
    const themeManager = new ThemeManager(body);
    //тема по умолчанию
    let currentTheme = 'POMODORO';
    let currentTime = CONFIG[currentTheme].time;

    function updateTimerAndDisplay() {
        themeManager.changeTheme(CONFIG[currentTheme].class);
        timerDisplay.update({ minutes: currentTime, seconds: 0 });
        timer.stop();
        saveTimeAndTheme(CONFIG[currentTheme].class, currentTime);
    }

    // Save theme and time from local storage
    const savedThemeAndTime = JSON.parse(localStorage.getItem("themeAndTime"));
    if (savedThemeAndTime) {
        const { theme, time } = savedThemeAndTime;
        const themeKey = theme.toUpperCase();
        if (CONFIG.hasOwnProperty(themeKey)) {
            currentTheme = themeKey;
            currentTime = parseInt(time, 10);
            updateTimerAndDisplay();
        }
    }

    // Click Pomodoro
    pomodoroButton.addEventListener("click", function () {
        currentTheme = 'POMODORO';
        currentTime = CONFIG[currentTheme].time;
        updateTimerAndDisplay();
    });

    // Click Short Break
    shortBreakButton.addEventListener("click", function () {
        currentTheme = 'SHORT_BREAK';
        currentTime = CONFIG[currentTheme].time;
        updateTimerAndDisplay();
    });

    // Click Long Break
    longBreakButton.addEventListener("click", function () {
        currentTheme = 'LONG_BREAK';
        currentTime = CONFIG[currentTheme].time;
        updateTimerAndDisplay();
    });

    // Click START and STOP timer
    startBtn.addEventListener("click", function () {
        if (!timer.timerInterval) {
            timer.start(currentTime, 0);
            startBtn.textContent = "PAUSE"; 
        } else {
            timer.stop();
            startBtn.textContent = "START";
        }
        console.log("clicked");
    });
});