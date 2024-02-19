function settingDOM(){
    const addTaskButton = document.querySelector(".add-task");
    const body = document.querySelector("body");
    const pomodoroButton = document.querySelector(".pomodoro-timer-btn");
    const shortBreakButton = document.querySelector(".short-break-timer-btn");
    const longBreakButton = document.querySelector(".long-break-timer-btn");
    const minuteId = "min";
    const secondId = "sec";
    const startBtn = document.querySelector(".start-btn");
    let counterSpan = document.querySelector(".counter-tasks");
    let timerInterval;
    const saveBtn = document.querySelector(".save-btn");
    const correctSaveBtn = document.querySelector(".correct-save-btn");
    const inputWriteTask = document.querySelector(".input-task");
    const containerTask = document.querySelector(".container-task");
    const containerForTask = document.querySelector(".container-for-task");
    const containerForCorrectTask = document.querySelector(".container-for-correct-task");
    const correctSpan= document.querySelector( ".correct-span-task")
    const correctCountPomodoros = document.querySelector(".correct-count-pomodoros");
    const openBtns = document.querySelectorAll(".open-task")
    let plusBtn = document.querySelector(".plus-btn")
    let minusBtn = document.querySelector(".minus-btn")
    let countInput = document.querySelector(".count-pomodoros")
    const ttFocus = document.querySelector(".tt-focus")
    //obj with settings of breaks
    const CONFIG = {
        POMODORO: {
        time: 25,
        class: "pomodoro-timer",
        },
        SHORT_BREAK: {
        time: 5,
        class: "short-break-timer",
        },
        LONG_BREAK: {
        time: 15,
        class: "long-break-timer",
        },
    };

    function saveTimeAndTheme(theme, time){
        localStorage.setItem("themeAndTime",JSON.stringify({theme, time}))
    }

    return {
        addTaskButton,
        body,
        pomodoroButton,
        shortBreakButton,
        longBreakButton,
        minuteId,
        secondId,
        startBtn,
        counterSpan,
        timerInterval,
        saveBtn,
        correctSaveBtn,
        inputWriteTask,
        containerTask,
        CONFIG,
        saveTimeAndTheme,
        containerForTask,
        containerForCorrectTask,
        correctSpan,
        correctCountPomodoros,
        openBtns,
        plusBtn,
        minusBtn,
        countInput,
        ttFocus
      };
}
export default settingDOM;