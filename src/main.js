import "./style.scss";
import "./pomodoro-timer.scss";
import "./short-break-timer.scss";
import "./long-break-timer.scss";

document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.querySelector(".add-task");
  const todoList = document.querySelector(".todo-list");
  const body = document.querySelector("body");
  const pomodoroButton = document.querySelector(".pomodoro-timer-btn");
  const shortBreakButton = document.querySelector(".short-break-timer-btn");
  const longBreakButton = document.querySelector(".long-break-timer-btn");
  const minuteId = "min";
  const secondId = "sec";
  const startBtn = document.querySelector(".start-btn");
  let counterSpan = document.querySelector(".counter-tasks");
  //control timer
  let timerInterval;
  const LS = localStorage;

  

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
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");
    key = CONFIG[key];
    min.textContent = key.time.toString().padStart(2, "0");
    sec.textContent = "00";
    changeColor(key.class);
    clearInterval(timerInterval);
    timerInterval = null; 
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


  //timer
  class Timer {
    constructor(minuteId, secondId) {
      this.minuteElement = document.getElementById(minuteId);
      this.secondElement = document.getElementById(secondId);
      this.timerInterval = null;
      this.minuteElement.textContent = CONFIG.POMODORO.time;
      this.secondElement.textContent = "00";
    }

    start() {
      this.timerInterval = setInterval(() => {
        let min = parseInt(this.minuteElement.textContent);
        let sec = parseInt(this.secondElement.textContent);
        sec--;
        if (sec < 0) {
          min = min - 1;
          if (min < 0) {
            clearInterval(this.timerInterval);
            // this.timerInterval = null
            // return
          }
          sec = 59;
        }
        this.minuteElement.textContent = min < 10 ? "0" + min : min;
        this.secondElement.textContent = sec < 10 ? "0" + sec : sec;
      }, 1000);
    }

    stop() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    }
  }

  const timer = new Timer(minuteId, secondId);

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

  //события для кнопки add task
  addTaskButton.addEventListener("click", function () {
    const todoList = document.querySelector(".todo-list");
    const newDiv = document.createElement("div");
    newDiv.classList = "container-for-task";
    newDiv.innerHTML = `
            <input type="text" placeholder="What are you working on?"  class="input-task"> 
            <div>
            <input type="number" placeholder="1" class="count-pomodoros"> 
            <button class="plus-btn">&#8657</button>
            <button  class="minus-btn">&#8659</button>
            </div>
            <div class="btns">
                <button class="cancel-btn">Cancel</button>
                <button class="save-btn">Save</button>
            </div>`;

    todoList.appendChild(newDiv);
    addTaskButton.remove();
  });

  let taskCount = 0
  //события для кнопки <button class="save-btn">Save</button>
  todoList.addEventListener("click", function (event) {
    const saveBtn = event.target.closest(".save-btn");
    if (saveBtn) {
        //count task
        taskCount++
        counterSpan.textContent = taskCount  
        
      const inputTask =
        saveBtn.parentElement.parentElement.querySelector(".input-task");
      const inputValue = inputTask.value;
      if (inputValue.trim() !== "") {
        const taskList = document.createElement("div");
        taskList.classList = "task-list";
        taskList.innerHTML = `
        <span class="do-task">${inputValue}</span>
        <div class="right-side">
            <span class="use-pmodoro">0</span>/<span class ="count-pomodoro">0</span>/
            <button class="delete-task"></button>
        </div>
       `;
        todoList.appendChild(taskList);
        inputTask.value = "";
      }
    }
  })
  
  
});
