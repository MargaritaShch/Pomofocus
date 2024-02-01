//themеs
const body = document.querySelector("body");
const startBtn = document.querySelector('.btn');
const redButton = document.querySelector(".red-btn");
const greenButton = document.querySelector(".green-btn");
const blueButton = document.querySelector(".blue-btn");
const minute = document.getElementById('min');
const second = document.getElementById('sec')
const addTask = document.querySelector("write-task")
const taskContainer = document.querySelector('.task-container');
const addTaskButton = document.querySelector('.add-task');
//сщхранение темы
const theme = localStorage.getItem("theme");
//сохранение минут
const savedMinute = localStorage.getItem("savedMinute");
//если есть тема
if(theme){
    //добавляем этот класс к body
    body.classList.add(theme)
}

if (savedMinute) {
    minute.innerHTML = savedMinute;
}

redButton.addEventListener('click', function(){
    //удаляем класс
    body.className = ""
    //устанавливаем время для данной темы
    minute.innerHTML ='25'
    //добавление/удаление темы 
    body.classList.toggle("red-theme");
    //усатновка новой темы в харанилище
    if(theme === "red-theme"){
        localStorage.setItem("theme", "")
    } else{
        localStorage.setItem("theme","red-theme")
        localStorage.setItem("savedMinute", minute.innerHTML);
    }
   
});

greenButton.addEventListener("click", function(){
    body.className = "";
    minute.innerHTML ='05'
    body.classList.toggle("green-theme")
    if(theme === "green-theme"){
        localStorage.setItem("theme", "")
    } else{
        localStorage.setItem("theme","green-theme")
        localStorage.setItem("savedMinute", minute.innerHTML);
    }
    
});

blueButton.addEventListener('click', function(){
    body.className = "";
    minute.innerHTML ='15'
    body.classList.toggle("blue-theme")
    if(theme === "blue-theme"){
        localStorage.setItem("theme", "")
    } else{
        localStorage.setItem("theme","blue-theme")
        localStorage.setItem("savedMinute", minute.innerHTML);
    }
});

//кол-во минут
let count = 25;
//перемeнная для проверки запущен таймер или нет- false - не запущен
let started = false;
//хранение интервала времени
let timerInterval;

startBtn.addEventListener("click",function(){
    //если запущен и повторна нажата кнопка СТАРТ останаваливаем 
    if(started){
        clearInterval(timerInterval);
        started = false;
        return;
    }
    //время начала остчета
    let start_time = new Date()
    //время окончания
    let stop_time = start_time.setMinutes(start_time.getMinutes()+count)
    //запуск отсчета секунд
    timerInterval = setInterval(function(){
        //получаем текущее время
        let now = new Date().getTime();
        //получаем оставшееся время
        let remainTime = stop_time - now;
        //перевод милисекунд в минуты
        let min = Math.floor((remainTime % (1000*60*60))/ (1000*60));
        //перевод милисекунд в секунды
        let sec = Math.floor((remainTime % (1000*60))/ 1000);
        //если секунд меньше 10, добавяем 0 перед
        sec = sec<10 ? "0"+sec : sec;
        //вывод нас страницу
        minute.innerHTML = min;
        second.innerHTML = sec
        //если время закончилось, останавливаем счетчик
        if(remainTime <0){
            clearTimeout(countSec)
        }
    },1000)
    //таймер запущен
        started = true
})

//при нажатии на add task открывать  createTableForTask()
addTaskButton.addEventListener("click", function(){
    const newDiv = createTableForTask();
    taskContainer.appendChild(newDiv)
    addTaskButton.remove()
})
//элемент для добавления задачи
function createTableForTask(){
    const div = document.createElement("div");
    div.classList.add('table-task');

    const input = document.createElement("input");
    
    const inputCount = document.createElement("input")
    inputCount.classList.add("count-pomodoros");

    const span = document.createElement("span");
    span.classList.add("est-pomodoros")
    span.textContent = "Est Pomodoros";

    const buttonUp = document.createElement("button")
    buttonUp.classList.add("up-btn");

    const buttonDown = document.createElement("button")
    buttonDown.classList.add("down-btn");

    const buttonCancel = document.createElement("button")
    buttonCancel.classList.add("cancel-btn");

    const buttonSave = document.createElement("button")
    buttonSave.classList.add("save-btn");

    div.appendChild(input);
    div.appendChild(inputCount);
    div.appendChild(span);
    div.appendChild(buttonUp);
    div.appendChild(buttonDown);
    div.appendChild(buttonCancel);
    div.appendChild(buttonSave);

    return div;
}