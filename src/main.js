import "./style.scss";
import "./pomodoro-timer.scss";
import "./short-break-timer.scss";
import "./long-break-timer.scss";
import Timer from "./Modules/Timer.js";
import UI from "./Modules/UI.js";

document.addEventListener("DOMContentLoaded", function () {
    const timer = new Timer();
    const ui = new UI(timer)

    timer.subscribe(ui)
    ui.getThemeAndTimeFromLocalStorage();
});