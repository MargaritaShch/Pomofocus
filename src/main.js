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


    function saveTimeAndTheme(theme, time){
      localStorage.setItem("themeAndTime",JSON.stringify({theme, time}))
    }
  //save theme and time from local storage
  const savedThemeAnadTime = JSON.parse(localStorage.getItem("themeAndTime"))
  if (savedThemeAnadTime) {
    const {theme, time} =savedThemeAnadTime
    changeColor(theme);

   
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");
    min.textContent = time.toString().padStart(2, "0");
    sec.textContent = "00";
  }
 
  console.log(savedThemeAnadTime)
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
    const theme = CONFIG[key].class
    const time = CONFIG[key].time
    
    let min = document.getElementById("min");
    let sec = document.getElementById("sec");
    min.textContent =time.toString().padStart(2, "0");
    sec.textContent = "00";
    
    changeColor(theme);
    clearInterval(timerInterval);
    timerInterval = null;
    
    saveTimeAndTheme(theme, time) 
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
    constructor(minuteId, secondId,savedTime) {
      this.minuteElement = document.getElementById(minuteId);
      this.secondElement = document.getElementById(secondId);
      this.timerInterval = null;
      this.minuteElement.textContent = savedTime.toString().padStart(2, "0") || CONFIG.POMODORO.time;
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


  const savedTime = savedThemeAnadTime ? savedThemeAnadTime.time : null;
  const timer = new Timer(minuteId, secondId, savedTime);

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
  
  //saved tasks onto the page
  savedTasks.forEach(savedTask => {
    const taskList = createTaskElement(savedTask);
    containerTask.appendChild(taskList);
  });

  countTask()

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
    const pomodoroCount = countInput.value;
    if (textInput.trim() === "") {
      inputWriteTask.placeholder = "Add your text";
      return;
    }

    const task = { textInput, pomodoroCount };
    const taskList = createTaskElement(task);
    containerTask.appendChild(taskList);
    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    inputWriteTask.value = "";
    countInput.value = ''
    countTask()
  });

  //сreate task 
  function createTaskElement(task) {
    const taskList = document.createElement("div");
    taskList.classList = "task-list";
    taskList.innerHTML = `
      <div class="do-task">
        <span>${task.textInput}</span>
      </div>
      <div class="right-side">
        <span class="use-pmodoro">0</span><span class ="count-pomodoro">/${task.pomodoroCount}</span> 
        <button class="open-task">open</button>
        <button class="delete-task">&#10006;</button>
      </div>`;
     
    //click DEL in task
    const deleteBtn = taskList.querySelector(".delete-task");
    deleteBtn.addEventListener("click", function () {
      taskList.remove();
      const taskIndex = savedTasks.indexOf(task);
      if (taskIndex !== -1) {
        savedTasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
        
      }
      countTask()
    });
    // counterPomodoro();
    return taskList;
  }

  //count tasks
  function countTask(){
    const count = savedTasks.length
    counterSpan.innerHTML = `#${count}`
  }
  console.log(savedTasks)
  
  //setting count pomodoro
  let plusBtn = document.querySelector(".plus-btn")
  let minusBtn = document.querySelector(".minus-btn")
  let countInput = document.querySelector(".count-pomodoros")
  let countPomodoro = document.querySelector(".count-pomodoro")
  countInput.value = 1

  function counterPomodoro(){
    console.log(countPomodoro)
    if (countPomodoro) {
      countPomodoro.innerHTML = `/${countInput.value}`;
    }
  }
  console.log(countPomodoro)
  plusBtn.addEventListener("click",function(){
    countInput.value++
    counterPomodoro()
  })

  minusBtn.addEventListener("click",function(){
    countInput.value--
    if(countInput.value <= 1){
       countInput.value = 1
    }
    counterPomodoro()
  })
})
