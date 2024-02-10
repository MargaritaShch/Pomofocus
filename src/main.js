import "./style.scss";
import "./pomodoro-timer.scss";
import "./short-break-timer.scss";
import "./long-break-timer.scss";


document.addEventListener('DOMContentLoaded', function(){
    //переключение темы
    const addTaskButton = document.querySelector(".add-task");
    const todoList = document.querySelector(".todo-list");
    const body = document.querySelector("body");
    const pomodoroButton = document.querySelector(".pomodoro-timer-btn");
    const shortBreakButton = document.querySelector(".short-break-timer-btn");
    const longBreakButton = document.querySelector(".long-break-timer-btn");
    const minuteId = "min";
    const secondId = "sec";
    const startBtn = document.querySelector(".start-btn");
    //control timer
    let timerInterval;
    
    //obj with settings of breaks
    const CONFIG = {
        POMODORO: {
          time: 25,
          class: 'pomodoro-timer',
        },
        SHORT_BREAK: {
          time: 5,
          class: 'short-break-timer',
        },
        LONG_BREAK: {
          time: 15,
          class: 'long-break-timer',
        },
      };


   //change color on breaks
   function changeColor(themeClass) {
    body.classList.remove('pomodoro-timer', 'short-break-timer', 'long-break-timer');
    body.classList.add(themeClass);
}
   //сchange breaks
   function findIndex(key){
        let min = document.getElementById("min");
        let sec = document.getElementById("sec");
        key = CONFIG[key];
        min.textContent = key.time.toString().padStart(2, "0");
        sec.textContent = "00";
        changeColor(key.class)
        clearInterval(timerInterval);
        timerInterval = null;
    }

    //click Pomodoro
    pomodoroButton.addEventListener("click", function(){
        findIndex("POMODORO")
        // changeColor(CONFIG.POMODORO);
    })
    //click Short Break
    shortBreakButton.addEventListener("click",function(){
        findIndex("SHORT_BREAK")
        // changeColor(CONFIG.SHORT_BREAK);
    })
    //click Long Breack
    longBreakButton.addEventListener("click", function(){
        findIndex("LONG_BREAK")
        // changeColor(CONFIG.LONG_BREAK);
    })
    
    //timer
    class Timer{
        constructor(minuteId, secondId){
            this.minuteElement = document.getElementById(minuteId);
            this.secondElement = document.getElementById(secondId);
            this.timerInterval = null;
            this.minuteElement.textContent = CONFIG.POMODORO.time;
            this.secondElement.textContent = "00";
        }
    
        start(){
            if(!this.timerInterval){
                this.timerInterval = setInterval(()=>{
                    let min = parseInt(this.minuteElement.textContent);
                    let sec = parseInt(this.secondElement.textContent);
                    sec--
                    if(sec < 0){
                        min = min -1;
                        if(sec<0){
                            clearInterval(this.timerInterval);;
                            this.timerInterval = null
                            return
                        }
                        sec =59;
                    }
                     this.minuteElement.textContent = (min < 10 ? "0"+min : min);
                     this.secondElement.textContent = (sec < 10 ? "0"+ sec : sec);
                },1000)
            }    
        }
    
        stop(){
            if(this.timerInterval){
                clearInterval(this.timerInterval);
                this.timerInterval = null
            }
        }
      }
    
    const timer = new Timer(minuteId, secondId);

    
    startBtn.addEventListener("click",function (){
        if (timer.timerInterval) {
          timer.stop();
      } else {
          timer.start();
      }
      console.log('Start button clicked')
    })
    timer.start();
  

    //события для кнопки add task
    addTaskButton.addEventListener('click', function(){
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
 
    })
    //события для кнопки <button class="save-btn">Save</button>
    todoList.addEventListener('click', function(event){
        const saveBtn = event.target.closest('.save-btn');
        if(saveBtn){
            const inputTask = saveBtn.parentElement.parentElement.querySelector(".input-task");
            const inputValue = inputTask.value;
            if(inputValue.trim() !== ''){ 
                const taskList = document.createElement("div");
                taskList.classList = "task-list";
                taskList.innerHTML = `
                    <span class="do-task">${inputValue}</span>
                    <button class="delete-task">Delete</button>`;
                todoList.insertBefore(taskList, todoList.firstChild); 
                inputTask.value = '';

            }
        }
    })
})





