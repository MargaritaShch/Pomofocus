import Tasks from "./Tasks";

export default class UI {
   constructor(timer){
        this.timer = timer;
        this.tasks = new Tasks()
        this.initializationDOMElements()
        this.addEventListener();
        this.tasks.loadTasks();
        this.getThemeAndTimeFromLocalStorage()
        this.displayTasks()
        timer.subscribe(this)
    }

    initializationDOMElements(){
        this.startBtn = document.querySelector(".start-btn");
        this.body = document.querySelector("body");
        this.pomodoroButton = document.querySelector(".pomodoro-timer-btn");
        this.shortBreakButton = document.querySelector(".short-break-timer-btn");
        this.longBreakButton = document.querySelector(".long-break-timer-btn");
        this.minuteElem = document.getElementById("min");
        this.secondElem = document.getElementById("sec");
        this.addTaskButton = document.querySelector(".add-task");
        this.containerForTask = document.querySelector(".container-for-task");
        this.containerTask = document.querySelector(".container-task");
        this.containerForCorrectTask = document.querySelector(".container-for-correct-task");
        this.countInput = document.querySelector(".count-pomodoros");
        this.correctSaveBtn = document.querySelector(".correct-save-btn");
        this.saveBtn = document.querySelector(".save-btn");
        this.correctCancelBtn = document.querySelector(".correct-cancel-btn");
        this.cancelBtn = document.querySelector(".cancel-btn")
        this.correctSpan= document.querySelector( ".correct-span-task");
        this.correctCountPomodoros = document.querySelector(".correct-count-pomodoros1");
        this.correctDeleteBtn = document.querySelector(".correct-delete-btn");
        this.inputWriteTask = document.querySelector(".input-task");
        this.ttFocus = document.querySelector(".tt-focus")
        //хранить выбранную задачу
        this.activeTaskId = null;
        this.currentTheme = 'POMODORO';
        this.CONFIG = {
            POMODORO: { time: 0.1 * 60 * 1000, themeId: "pomodoro-break-timer" },
            SHORT_BREAK: { time: 5 * 60 * 1000, themeId: "short-break-timer" },
            LONG_BREAK: { time: 15 * 60 * 1000, themeId: "long-break-timer" },
        };
    }

    addEventListener(){
        this.startBtn.addEventListener("click",  () =>{
            this.toggleTimer()
        });
        this.pomodoroButton.addEventListener("click", () => this.changeTheme('POMODORO'));
        this.shortBreakButton.addEventListener("click", () => this.changeTheme('SHORT_BREAK'));
        this.longBreakButton.addEventListener("click", () => this.changeTheme('LONG_BREAK'));
        this.addTaskButton.addEventListener("click", () => this.toggleTaskContainer());
        this.saveBtn.addEventListener("click", (event) => this.saveTask(event));
        this.correctCancelBtn.addEventListener("click", () => this.containerForCorrectTask.style.display = "none");
        this.cancelBtn.addEventListener("click", () => this.containerForTask.style.display = "none");
        this.correctSaveBtn.addEventListener("click", (event)=> this.saveTask(event));
    }

    toggleTaskContainer() {
        this.containerForTask.style.display = this.containerForTask.style.display === "none" ? "block" : "none";
    }

    saveTask(event) {
        event.preventDefault();
        const textInput = this.inputWriteTask.value;
        const pomodoroCount = this.countInput.value || 1;
        if (textInput.trim() === "") {
            alert("Please, add your text");
            return;
        }
        this.tasks.addTask(textInput, pomodoroCount); 
        this.inputWriteTask.value = "";
        this.countInput.value = "1";
        this.displayTasks(); 
        this.toggleTaskContainer();
    }

    displayTasks() {
        const tasks = this.tasks.getTasks();
        this.containerTask.innerHTML = ''; 
        tasks.forEach((task, index) => {
            const taskElement = this.createTaskElement(task, index);
            this.containerTask.appendChild(taskElement);
    });
    }

    createTaskElement(task, index) {
        const taskList = document.createElement("div");
        taskList.classList.add("task-list");
        taskList.setAttribute("draggable", "true");
        taskList.setAttribute("data-id", task.id);
        //для отображение чекбокса с выполнеными помидорками

        taskList.innerHTML = `
          <div class="do-task">
          <input type="checkbox" class = "checkbox">
            <span >${task.textInput}</span>
          </div>
          <div class="right-side">
           
            <span class="use-pmodoro">${task.completedPomodoros || 0}</span><span class ="count-pomodoro">/${task.pomodoroCount}</span> 
            <button class="open-task">open</button>
            <button class="delete-task">&#10006;</button>
          </div>`;
        
        
          const checkbox = taskList.querySelector('.checkbox');
          const textSpan = taskList.querySelector('.do-task span');
          // автоматическое отображение чекбокса при выполненно лимите помидорок
          if (task.completedPomodoros >= task.pomodoroCount) {
            checkbox.checked = true; 
            textSpan.style.textDecoration = "line-through"; 
        }

        //отображение чекбокса
          checkbox.addEventListener("change", () => {
              if (checkbox.checked) {
                  textSpan.style.textDecoration = "line-through";
              } else {
                  textSpan.style.textDecoration = "none";
              }
              taskList.parentNode.appendChild(taskList);
        })
        //отображение контейнера для настройки задачи искрытие контейнара для корректирвки задачи
        const openBtn = taskList.querySelector(".open-task");
        openBtn.addEventListener("click", () => {
            this.containerForTask.remove()
            this.containerForCorrectTask.style.display = "block";
            this.correctSpan.textContent = task.textInput; 
        });
    
        this.correctDeleteBtn.addEventListener("click", ()=> {
          this.deleteTask(taskList, task)
        })
    
        const taskContent = taskList.querySelector('.do-task span'); 
        taskList.addEventListener('click', () => {
          const highlighted = document.querySelector('.task-list.highlighted');
          if (highlighted) {
              highlighted.classList.remove('highlighted'); 
          }
          taskList.classList.add('highlighted'); 
          this.ttFocus.textContent = taskContent.textContent; 
          //сохранить выбранную задачу
          this.activeTaskId = task.id; 
        })
        //click DEL btns in task
        const deleteBtn = taskList.querySelector(".delete-task");
        deleteBtn.addEventListener("click", ()=>{
           this.tasks.deleteTask(task.id)
           this.displayTasks()
        })

        taskList.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", task.id);
        });
    
        //dragover и drop 
        this.containerTask.addEventListener("dragover", (e) => {
            e.preventDefault(); 
            e.dataTransfer.dropEffect = "move";
        });
    
        this.containerTask.addEventListener("drop", (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData("text/plain");
            const targetTask = this.containerTask.querySelector(`[data-id='${taskId}']`);
            //найти ближайшую задачу
            const closestTask = e.target.closest(".task-list");
    
            if (closestTask && targetTask !== closestTask) {
                //перетащить задачу и сбросит место
                this.containerTask.insertBefore(targetTask, closestTask);
               
            }
        });

        const usedPomodorosSpan = taskList.querySelector('.use-pmodoro');
        usedPomodorosSpan.textContent = task.completedPomodoros;

        return taskList;
    }

    toggleTimer(){
        //проверка на д=лимит
        const activeTask = this.tasks.savedTasks.find(task => task.id === this.activeTaskId);
        if (activeTask && activeTask.completedPomodoros >= activeTask.pomodoroCount) {
            alert("Достигнут лимит помидорок для этой задачи");
            return; 
        }


        if (!this.timer.isRunning()) {
            const timeInMilliseconds = this.CONFIG[this.currentTheme].time;
            this.timer.start(timeInMilliseconds);
            this.startBtn.textContent = "PAUSE";
        } else {
            this.timer.stop();
            this.startBtn.textContent = "START";
            if (this.activeTaskId !== null) {
                this.displayTasks(); 
              }
        }
    }

    changeTheme(theme) {
        const themeConfig = this.CONFIG[theme];
        this.currentTheme = theme;
        this.body.classList.remove("pomodoro-timer", "short-break-timer", "long-break-timer");
        this.body.classList.add(themeConfig.themeId);
        const minutes = Math.floor(themeConfig.time/60000)
        const seconds = Math.floor((themeConfig.time % 60000)/1000)
        this.updateTimeDisplay( minutes,  seconds );
        this.timer.stop();
        this.saveThemeAndTimeToLocalStorage();
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

    saveThemeAndTimeToLocalStorage(){
        localStorage.setItem('themeAndTime', JSON.stringify({
            theme: this.currentTheme,
            time: this.CONFIG[this.currentTheme].time
          }));
    }

    updateTimeDisplay(minutes, seconds) {
            this.minuteElem.textContent = minutes.toString().padStart(2, "0");
            this.secondElem.textContent = seconds.toString().padStart(2, "0");
    }
    
    getUsedPomodoro() {
        if (this.activeTaskId) {
            this.tasks.handlePomodoroComplete(this.activeTaskId);
            this.displayTasks(); 
        }
    }
    update(data){
        //если время закончилось само обновляется таймер, кнопка и прогресс бар до начального состояния
        if (data.type === 'POMODORO_COMPLETE') {
            this.startBtn.textContent = "START";
            const themeConfig = this.CONFIG[this.currentTheme];
            const minutes = Math.floor(themeConfig.time / 60000);
            const seconds = Math.floor((themeConfig.time % 60000) / 1000);
            this.updateTimeDisplay(minutes, seconds);
            //сбросить прогрессбар
            this.updateProgressBar(0); 
            this.getUsedPomodoro(); 
        } else if (data.type === 'TICK') {
            this.updateTimeDisplay(data.minutes, data.seconds);
            this.updateProgressBar(data.percentComplete);
        }
    }
    //отсчет времени в прогресс бар
    updateProgressBar(percentComplete) {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${percentComplete}%`;
        }
    } 
}
