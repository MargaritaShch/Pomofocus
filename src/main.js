import "./style.scss"
import "./style/pomodoro-timer.scss";
import "./style/short-break-timer.scss";
import "./style/long-break-timer.scss" 
import Timer from "./Modules/Timer.js";
import UI from "./Modules/UI.js";
import State from "./Modules/state.js";


class App {
    constructor() {
        this.state = new State();
        this.timer = new Timer(this.state);
        this.ui = new UI(this.timer, this.state);

        this.timer.subscribe(this.ui);
        this.ui.getThemeAndTimeFromLocalStorage();
    }
}

new App();