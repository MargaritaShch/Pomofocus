import "./style.scss";
import "./pomodoro-timer.scss";
import "./short-break-timer.scss";
import "./long-break-timer.scss";
import Timer from "./Modules/Timer.js";
import TimeDisplay from "./Modules/TimeDisplay.js";
import Tasks from "./Modules/Tasks.js";
import UI from "./Modules/UI.js";

document.addEventListener("DOMContentLoaded", function () {
    const timer = new Timer();
    const ui = new UI(timer)
    const timerDisplay = new TimeDisplay("min", "sec");
    const tasks = new Tasks();

    timer.subscribe(timerDisplay);
    timer.subscribe(ui)
    ui.getThemeAndTimeFromLocalStorage();
});