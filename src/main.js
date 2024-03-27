import "./style.scss"
import "./style/pomodoro-timer.scss";
import "./style/short-break-timer.scss";
import "./style/long-break-timer.scss" 
import Timer from "./Modules/Timer.js";
import UI from "./Modules/UI.js";

document.addEventListener("DOMContentLoaded", function () {
    const timer = new Timer();
    const ui = new UI(timer)

    timer.subscribe(ui)
    ui.getThemeAndTimeFromLocalStorage();
});