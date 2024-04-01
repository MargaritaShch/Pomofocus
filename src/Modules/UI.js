import Tasks from "./Tasks";
import  CONFIG, { POMODORO, SHORT_BREAK, LONG_BREAK }  from "../templates/config";
import { createTaskElement } from '../templates/createTask';

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
        this.settingsDragAndDrop()
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
        this.countInput = document.querySelector(".count-pomodoros");
        this.saveBtn = document.querySelector(".save-btn");
        this.cancelBtn = document.querySelector(".cancel-btn")
        this.inputWriteTask = document.querySelector(".input-task");
        this.ttFocus = document.querySelector(".tt-focus")
        this.plusBtn = document.querySelector(".plus-btn");
        this.minusBtn = document.querySelector(".minus-btn");
        this.deleteBtn = document.querySelector(".delete-btn");
        //хранить выбранную задачу
        this.activeTaskId = null;
        //дефолтная тема
        this.currentTheme = POMODORO;
    }

    addEventListener(){
        this.startBtn.addEventListener("click",  () =>{
            this.toggleTimer()
        });
        this.pomodoroButton.addEventListener("click", () => this.changeTheme(POMODORO));
        this.shortBreakButton.addEventListener("click", () => this.changeTheme(SHORT_BREAK));
        this.longBreakButton.addEventListener("click", () => this.changeTheme(LONG_BREAK));
        this.addTaskButton.addEventListener("click", () =>  this.toggleTaskContainer());
        this.saveBtn.addEventListener("click", (event) => this.saveTask(event));
        this.deleteBtn.addEventListener("click", (event) => {
            event.stopPropagation()
            if (this.activeTaskId) {
                this.tasks.deleteTask(this.activeTaskId);
                this.displayTasks();
                this.activeTaskId = null; 
            }
            this.deleteBtn.style.display = "none";
            this.toggleTaskContainer(false); 
        })
        
        this.cancelBtn.addEventListener("click", () => this.containerForTask.style.display = "none");
        this.plusBtn.addEventListener("click", () => this.incrementCount());
        this.minusBtn.addEventListener("click", () => this.decrementCount());
    }

    addEventListenerForTask(taskElement, task) {
        const checkbox = taskElement.querySelector('.checkbox');
        const openBtn = taskElement.querySelector('.open-task');
        const deleteTaskBtn = taskElement.querySelector('.delete-task');
        const textSpan = taskElement.querySelector('.do-task span');
        const usedPomodorosSpan = taskElement.querySelector('.use-pmodoro');
          // автоматическое отображение чекбокса при выполненно лимите помидорок
          if (task.completedPomodoros >= task.pomodoroCount) {
            checkbox.checked = true; 
            textSpan.style.textDecoration = "line-through"; 
        }

        //отображение чекбокса
          checkbox.addEventListener("change", () => {
            this.tasks.updateTaskCompletion(task.id);
            taskElement.parentNode.appendChild(taskElement);
            //если чекбокс отжат менять стиль
            if (checkbox.checked) {
                taskElement.classList.remove('highlighted'); 
                taskElement.style.borderColor = "palegreen"; 
                taskElement.style.backgroundColor = "lightgrey"; 
            } else {
                taskElement.style.borderColor = ""; 
                taskElement.style.backgroundColor = ""; 
            }
        })

        //отображение контейнера для настройки задачи и скрытие контейнара для корректирвки задачи
        openBtn.addEventListener("click", () => {
            const currentValue = task.textInput;
            this.inputWriteTask.value = currentValue;
            this.currentEditingValue = currentValue;
            this.countInput.value = task.pomodoroCount;
            this.activeTaskId = task.id;
            this.toggleTaskContainer(true, task);
            if (this.deleteBtn) this.deleteBtn.style.display = 'inline-block';
        });
    
        deleteTaskBtn.addEventListener("click", (event)=>{
            event.stopPropagation();
            if (confirm("Вы уверены, что хотите удалить эту задачу?")) {
                this.tasks.deleteTask(task.id);
                this.displayTasks();
                this.toggleTaskContainer(false); 
              }
         })

        usedPomodorosSpan.textContent = task.completedPomodoros;
    
        taskElement.addEventListener('click', () => {
          const highlighted = document.querySelector('.task-list.highlighted');
          if (highlighted) {
              highlighted.classList.remove('highlighted'); 
          }
          taskElement.classList.add('highlighted'); 
          this.ttFocus.textContent = textSpan.textContent; 
          //сохранить выбранную задачу
          this.activeTaskId = task.id; 
        })
        
        taskElement.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", task.id);
        });
        

        usedPomodorosSpan.textContent = task.completedPomodoros;   
    }

    toggleTaskContainer(editMode, task = {}) {
        if (editMode === false) {
            this.containerForTask.style.display = "none";
            return; 
        }
        this.containerForTask.style.display = editMode && this.activeTaskId ? "block" : "none";
        this.containerForTask.style.display = "block";
        // если редактируеся существующая задача
        if (editMode) {
            this.inputWriteTask.value = task.textInput || "";
            this.countInput.value = task.pomodoroCount || 1;
            this.activeTaskId = task.id;
            this.deleteBtn.style.display = "inline-block";
        }  else {
            this.inputWriteTask.value = "";
            this.countInput.value = 1;
            this.activeTaskId = null;
            this.deleteBtn.style.display = "none"; 
        }
    }
    
    saveTask(event) {
        console.log("Saving task...");
        event.preventDefault();
        const textInput = this.inputWriteTask.value.trim();
        const pomodoroCount = Number(this.countInput.value) || 1;
        if (!textInput) {
            alert("Введите название задачи");
            return;
        }
        if (this.activeTaskId) {
            this.tasks.updateTask(this.activeTaskId, textInput, pomodoroCount);
            // this.activeTaskId = null;
        } else {
            this.tasks.addTask(textInput, pomodoroCount);
        }
        //очитска формы
        this.activeTaskId = null
        this.inputWriteTask.value = "";
        this.countInput.value = "1";
        this.displayTasks();
        this.containerForTask.style.display = "none"
    }

    displayTasks() {
        const tasks = this.tasks.getTasks();
        this.containerTask.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskHTML = createTaskElement(task);
            const taskElement = document.createElement("div");
            taskElement.classList.add("task-list");
            taskElement.setAttribute("draggable", "true");
            taskElement.setAttribute("data-id", task.id);
            taskElement.innerHTML = taskHTML;
            this.addEventListenerForTask(taskElement, task);
            this.containerTask.appendChild(taskElement);
        });
        //отображение первой задачи 
        if (tasks.length > 0) {
            this.ttFocus.textContent = tasks[0].textInput;
        } else {
            this.ttFocus.textContent = "Time to focus!"; // Текст по умолчанию, если задач нет
        }
    }

    //dragover и drop 
    settingsDragAndDrop() {
        this.containerTask.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
        });
    
        this.containerTask.addEventListener("drop", (e) => {
            e.preventDefault();
            const taskId = e.dataTransfer.getData("text/plain");
            const targetTask = this.containerTask.querySelector(`[data-id='${taskId}']`);
            const closestTask = e.target.closest(".task-list");
    
            if (closestTask && targetTask !== closestTask) {
                this.containerTask.insertBefore(targetTask, closestTask.nextSibling); 
            }
        });
    }

    updateTaskCount(count) {
        const pomodoroSpan = this.taskList.querySelector(".count-pomodoro");
        pomodoroSpan.textContent = `/${count}`;
      }
    
      incrementCount() {
        if (this.activeTaskId) {
            //определенная задача
            const task = this.tasks.getTaskById(this.activeTaskId);
            if (task) {
                task.pomodoroCount++;
                this.tasks.saveTasks(); 
                this.countInput.value = task.pomodoroCount; 
                this.displayTasks(); 
            }
        } else {
            this.countInput.value++;
        }
    }
    
    decrementCount() {
        if (this.activeTaskId) {
            const task = this.tasks.getTaskById(this.activeTaskId);
            if (task && task.pomodoroCount > 1) {
                task.pomodoroCount--;
                this.tasks.saveTasks(); 
                this.countInput.value = task.pomodoroCount; 
                this.displayTasks(); 
            }
        } else {
            this.countInput.value--;
            if (this.countInput.value <= 1) {
                this.countInput.value = 1;
            }
        }
    }
    
      counterPomodoro() {
        let countPomodoro = document.querySelector(".count-pomodoro");
        if (countPomodoro) {
          countPomodoro.innerHTML = `/${this.countInput.value}`;
        }
      }
      
    toggleTimer(){
        //проверка на д=лимит
        const activeTask = this.tasks.savedTasks.find(task => task.id === this.activeTaskId);
        if (activeTask && activeTask.completedPomodoros >= activeTask.pomodoroCount) {
            alert("Достигнут лимит помидорок для этой задачи");
            return; 
        }

        if (!this.timer.isRunning()) {
            const timeInMilliseconds = CONFIG[this.currentTheme].time;
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
        const themeConfig = CONFIG[theme];
        this.currentTheme = theme;
        this.body.classList.remove(CONFIG[POMODORO].themeId, CONFIG[SHORT_BREAK].themeId, CONFIG[LONG_BREAK].themeId);
        this.body.classList.add(themeConfig.themeId);
        const { minutes, seconds } = this.timer.convertTime(themeConfig.time);
        this.timer.stop();
        this.updateTimeDisplay( minutes,  seconds );
        this.saveThemeAndTimeToLocalStorage();
    }

    getThemeAndTimeFromLocalStorage(){
        const savedThemeAndTime = JSON.parse(localStorage.getItem('themeAndTime'));
        if (savedThemeAndTime && CONFIG.hasOwnProperty(savedThemeAndTime.theme)) {
            this.changeTheme(savedThemeAndTime.theme);
            } else {
            //тема по умолчанию
            this.changeTheme(POMODORO);
            }
    }

    saveThemeAndTimeToLocalStorage(){
        localStorage.setItem('themeAndTime', JSON.stringify({
            theme: this.currentTheme,
            time: CONFIG[this.currentTheme].time
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
            const themeConfig = CONFIG[POMODORO];
            const { minutes, seconds } = this.timer.convertTime(themeConfig.time);
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
