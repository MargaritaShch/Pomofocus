import TimeDisplay from "./TimeDisplay";


export default class UI {
   constructor(timer){
        this.minuteElem = document.getElementById(this.minuteId);
        this.secondElem = document.getElementById(this.secondId);
        this.startBtn = document.querySelector(".start-btn");
        this.timer = timer;
        this.pomodoroButton = document.querySelector(".pomodoro-timer-btn");
        this.shortBreakButton = document.querySelector(".short-break-timer-btn");
        this.longBreakButton = document.querySelector(".long-break-timer-btn");
        this.timerDisplay = new TimeDisplay('min', 'sec');
        this.body = document.querySelector("body");
        // this.addTaskButton = document.querySelector(".add-task");
        // this.counterSpan = document.querySelector(".counter-tasks");
        // this.timerInterval;
        // this.saveBtn = document.querySelector(".save-btn");
        // this.inputWriteTask = document.querySelector(".input-task");
        // this.containerTask = document.querySelector(".container-task");
        // this.containerForTask = document.querySelector(".container-for-task");
        // this.openBtns = document.querySelectorAll(".open-task");
        // this.plusBtn = document.querySelector(".plus-btn");
        // this.minusBtn = document.querySelector(".minus-btn");
        // this.countInput = document.querySelector(".count-pomodoros");
        // this.ttFocus = document.querySelector(".tt-focus");
        // this.correctPlusBtn = document.querySelector(".correct-plus-btn");
        // this.correctMinusBtn = document.querySelector(".correct-minus-btn");
        // this.correctSpan= document.querySelector( ".correct-span-task");
        // this.correctCountPomodoros = document.querySelector(".correct-count-pomodoros1");
        // this.containerForCorrectTask = document.querySelector(".container-for-correct-task");
        // this.correctSaveBtn = document.querySelector(".correct-save-btn");
        // this.correctDeleteBtn = document.querySelector(".correct-dethis.-btn");
        // this.correctCancelBtn = document.querySelector(".correct-cancel-btn");
        // this.minuteElem = document.getElementById("min");
        // this.secondElem = document.getElementById("sec");
        // this.pomodoroButton = document.querySelector(".pomodoro-timer-btn");
        // this.shortBreakButton = document.querySelector(".short-break-timer-btn");
        // this.longBreakButton = document.querySelector(".long-break-timer-btn");
        this.currentTheme = 'POMODORO';
        this.CONFIG = {
            POMODORO: {
            time: 25,
            themeId: "pomodoro-break-timer",
            },
            SHORT_BREAK: {
            time: 5,
            themeId: "short-break-timer",
            },
            LONG_BREAK: {
            time: 15,
            themeId: "long-break-timer",
            },
        };
        this.initialization();
    }

    initialization (){
        this.startBtn.addEventListener("click",  () =>{
            this.toggleTimer()
        });
        this.pomodoroButton.addEventListener("click", () => this.changeTheme('POMODORO'));
        this.shortBreakButton.addEventListener("click", () => this.changeTheme('SHORT_BREAK'));
        this.longBreakButton.addEventListener("click", () => this.changeTheme('LONG_BREAK'));
    }

    saveThemeAndTimeToLocalStorage(){
        localStorage.setItem('themeAndTime', JSON.stringify({
            theme: this.currentTheme,
            time: this.CONFIG[this.currentTheme].time
          }));
    }

    getThemeAndTimeFromLocalStorage(){
        const savedThemeAndTime = JSON.parse(localStorage.getItem('themeAndTime'));
        if (savedThemeAndTime && this.CONFIG.hasOwnProperty(savedThemeAndTime.theme)) {
            this.changeTheme(savedThemeAndTime.theme);
            } else {
            //тема по умолчанию
            this.changeTheme('POMODORO');
            }
    }

    changeTheme(theme) {
        const themeConfig = this.CONFIG[theme];
        this.currentTheme = theme;
        this.body.classList.remove("pomodoro-timer", "short-break-timer", "long-break-timer");
        this.body.classList.add(themeConfig.themeId);
        this.timerDisplay.update({ minutes: themeConfig.time, seconds: 0 });
        this.timer.stop();
        this.saveThemeAndTimeToLocalStorage();
    }

    update(time) {
        //если эл-ты есть
        if (this.minuteElem && this.secondElem) { 
            this.minuteElem.textContent = time.minutes.toString().padStart(2, "0");
            this.secondElem.textContent = time.seconds.toString().padStart(2, "0");
          }
    }

    toggleTimer(){
        if (!this.timer.isRunning()) {
            const timeInMinutes = this.CONFIG[this.currentTheme].time;
            this.timer.start(timeInMinutes * 60 * 1000); //перевод в милесекунды
            this.startBtn.textContent = "PAUSE";
        } else {
            this.timer.stop();
            this.startBtn.textContent = "START";
        }
        console.log("Timer toggled");
    }
}

   
