import "./style.scss";
import "./green-theme.scss";
import "./blue-theme.scss";
import "./red-theme.scss";
const body = document.querySelector("body");
const redButton = document.querySelector(".red-btn");
const greenButton = document.querySelector(".green-btn");
const blueButton = document.querySelector(".blue-btn");
const addTask = document.querySelector("write-task");
const theme = localStorage.getItem("theme");
const savedMinute = localStorage.getItem("savedMinute");

//таймер
const startBtn = document.querySelector(".btn");
startBtn.addEventListener("click", function (){
    const minute = document.getElementById("min");
    const second = document.getElementById("sec");
})

document.addEventListener('DOMContentLoaded', function(){
    const addTaskButton = document.querySelector(".add-task");
    const todoList = document.querySelector(".todo-list");

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





