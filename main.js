//themеs
const body = document.querySelector("body");
const startBtn = document.querySelector('.btn');
const redButton = document.querySelector(".red-theme");
const greenButton = document.querySelector(".green-theme");
const blueButton = document.querySelector(".blue-theme");
const minute = document.getElementById('min');
const second = document.getElementById('sec')

redButton.addEventListener('click', function(){
    body.style.backgroundColor = 'rgb(186, 73, 73)';
    startBtn.style.color ='rgb(186, 73, 73)';
    redButton.style.backgroundColor ='rgba(0, 0, 0, 0.15)';
    greenButton.style.backgroundColor ='rgb(186, 73, 73,0)';
    blueButton.style.backgroundColor = 'rgb(186, 73, 73,0)';
    minute.textContent = '25'
});

greenButton.addEventListener('click', function(){
    const body = document.querySelector("body");
    body.style.backgroundColor = 'rgb(56, 133, 138)';
    startBtn.style.color ='rgb(56, 133, 138)';
    greenButton.style.backgroundColor ='rgba(0, 0, 0, 0.15)';
    redButton.style.backgroundColor ='rgb(56, 133, 138, 0)';
    blueButton.style.backgroundColor = 'rgb(56, 133, 138, 0)';
    minute.textContent = '05'
});

blueButton.addEventListener('click', function(){
    const body = document.querySelector("body");
    body.style.backgroundColor = 'rgb(57, 112, 151)';
    startBtn.style.color ='rgb(57, 112, 151)';
    blueButton.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
    greenButton.style.backgroundColor ='rgb(57, 112, 151, 0)';
    redButton.style.backgroundColor ='rgb(57, 112, 151, 0)';
    minute.textContent = '15';
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