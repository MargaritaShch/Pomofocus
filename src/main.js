import "./style.scss";
import "./green-theme.scss";
import "./blue-theme.scss";
import "./red-theme.scss";
// const addTask = document.querySelector("write-task");
// const theme = localStorage.getItem("theme");
// const savedMinute = localStorage.getItem("savedMinute");

document.addEventListener('DOMContentLoaded', function(){
    //переключение темы
    const addTaskButton = document.querySelector(".add-task");
    const todoList = document.querySelector(".todo-list");
    const body = document.querySelector("body");
    const redButton = document.querySelector(".red-btn");
    const greenButton = document.querySelector(".green-btn");
    const blueButton = document.querySelector(".blue-btn");
    const minute = document.getElementById("min");
    const second = document.getElementById("sec");
    const startBtn = document.querySelector(".start-btn");

    //СМЕНА ТЕМЫ
    let theme = [
        {name: "Pomodoro",
        time: 25,
        color: "red-theme"},

        {name: "Short Break",
        time: 5,
        color: "green-theme"},

        {name:"Long Break",
        time: 15,
        color: "blue-theme"},
    ]

   //текущий индекс темы
   let currentTheme = 0;

   //смена цвета
   function changeColor(currentTheme){
    body.classList.remove("red-theme", "green-theme", "blue-theme")
    if(currentTheme === 0){
        body.classList.add(theme[0].color)
    } else if(currentTheme === 1){
        body.classList.add(theme[1].color)
    } else if(currentTheme === 2){
        body.classList.add(theme[2].color)
    }
   }

   function findIndex(index){
    // stopTimer()
    currentTheme = index;
    minute.textContent = theme[currentTheme].time
    second.textContent = "00"
    changeColor(currentTheme)
   }

   redButton.addEventListener("click", function(){
    findIndex(0)
   })
   greenButton.addEventListener("click",function(){
    findIndex(1)
   })

   blueButton.addEventListener("click", function(){
    findIndex(2)
   })
    
   //ТАЙМЕР
   function timer(){
        let min = parseInt(minute.textContent)
        let sec = parseInt(second.textContent)

        let timerId = setInterval(() => {
            sec--
            if(sec < 0){
                min = min - 1
                if(min<0){
                    clearInterval(timerId)
                    return
                }
                sec =59 
            }
            minute.textContent = (min < 10 ? "0" + min : min);
            second.textContent = (sec < 10 ? "0" + sec : sec)
        }, 1000); 
   }

//    let started = true;
//     //хранение интервала времени
//     let timerInterval;

//     function stopTimer(){
//         clearInterval(timerInterval)
//         started = false
//     }
    startBtn.addEventListener("click",function(){

        timer()
    })

     
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





