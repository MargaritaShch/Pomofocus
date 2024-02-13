import "./style.scss";
import "./pomodoro-timer.scss";
import "./short-break-timer.scss";
import "./long-break-timer.scss";

document.addEventListener("DOMContentLoaded", function () {
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
  const inputWriteTask = document.querySelector(".input-task");
  const containerTask = document.querySelector(".container-task");

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

  //click START and launch timer
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
  //save tasks from local storage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Load saved tasks onto the page
  savedTasks.forEach(savedTask => {
    const taskList = createTaskElement(savedTask);
    containerTask.appendChild(taskList);
  });


  const containerForTask = document.querySelector(".container-for-task");
  addTaskButton.addEventListener("click", function () {
    if (containerForTask.style.display === "none") {
      containerForTask.style.display = "block";
    } else {
      containerForTask.style.display === "none";
    }
    addTaskButton.remove();
  });

  //save task and add in container-task
  saveBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const textInput = inputWriteTask.value;
    if (textInput.trim() === "") {
      inputWriteTask.placeholder = "Add your text";
      return;
    }

    const taskList = createTaskElement(textInput);
    containerTask.appendChild(taskList);

    savedTasks.push(textInput);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    inputWriteTask.value = "";
  });

  //сreate task 
  function createTaskElement(taskText) {
    const taskList = document.createElement("div");
    taskList.classList = "task-list";
    taskList.innerHTML = `
      <div class="do-task">
        <span>${taskText}</span>
      </div>
      <div class="right-side">
        <span class="use-pmodoro">0</span><span class ="count-pomodoro">/0</span> 
        <button class="delete-task">DEL</button>
      </div>`;

    //click DEL in task
    const deleteBtn = taskList.querySelector(".delete-task");
    deleteBtn.addEventListener("click", function () {
      taskList.remove();
      const taskIndex = savedTasks.indexOf(taskText);
      if (taskIndex !== -1) {
        savedTasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
      }
    });
    return taskList;
  }

  function countTask(){
    
  }
})