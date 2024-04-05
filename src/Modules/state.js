import {POMODORO, MAX_WORK_POMODOROS, SHORT_BREAK, LONG_BREAK} from "../templates/config.js";

class State {
    constructor() {
        this.state = {
            countWorkTimer: 1,
            theme: POMODORO,
            selectedTask: null, // Task
            allPomodoros: 0,// хранить количество всех помидорок, к-ые пользователь заложил в задачи
        }
    }

    // в UI allPomodoros * POMODORO.time = все время заложенное на все задачи

    updateAllPomodoros(value) {
        this.state.allPomodoros += value;
    }


    incrementCountWorkTimer() {
        this.state.countWorkTimer++;
    }

    getCountWorkTimer() {
        return this.state.countWorkTimer;
    }

    resetCountWorkTimer() {
        this.state.countWorkTimer = 1;
    }

    setTheme(theme = POMODORO) {
        this.state.theme = theme;
    }

    setNextTheme() {
        if (this.state.theme === POMODORO) {
            if (this.state.countWorkTimer < MAX_WORK_POMODOROS) {
                this.incrementCountWorkTimer();
                this.setTheme(SHORT_BREAK);
                // this.getSelectedTask.incrementCountPomodoros();
            } else if (this.state.countWorkTimer === MAX_WORK_POMODOROS) {
              this.incrementCountWorkTimer();
              this.setTheme(LONG_BREAK);
            } else {
                this.resetCountWorkTimer();
                this.setTheme(POMODORO);
            }
        } else {
            if (this.state.theme === LONG_BREAK) {
                this.resetCountWorkTimer();
            }
            this.setTheme(POMODORO);
        }

        console.log('countWorkTimer', this.state.countWorkTimer);
    }

    setSelectTask(task) {
        this.state.selectedTask = task;
    }

    getSelectedTask() {
        return this.state.selectedTask;
    }

    getTheme() {
        return this.state.theme;
    }
}
export default State;