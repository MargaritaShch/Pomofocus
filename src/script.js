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
  
  
  function changeTheme(CONFIG) {  // theme = {time; color} 
    body.classList.remove('');
    body.classList.add(theme.class);
    body.innerHTML = theme.time;
  }



  const startBtn = document.querySelector(".start-btn");
  const minute = document.getElementById("min");
  const second = document.getElementById("sec");
  let timerInterval;
  let CONFIG_BREAK = {
    POMODORO: {
        time: 25,
        color: "red-theme",
    },
    SHORT_BREAK: {
        time: 5,
        color: "green-theme",
    },
    LONG_BREAK: {
        time: 15,
        color: "blue-theme",
    }
  }
  function changeColor(currentTheme){
    body.classList.remove("")
    body.classList.add(CONFIG_BREAK.color)
   }
  shortBreakBtn.addEventListener('click', () => {
    changeTheme(CONFIG.SHORT_BREAK);
  });
  
  longBreakBtn.addEventListener('click', () => {
    changeTheme(CONFIG.LONG_BREAK);
  });

  class Timer{
    constructor(minute, second, timerInterval){
        this.minute = minute;
        this.second = second;
        this.timerInterval = timerInterval;
    }

    start(){
        if(this.timerInterval){
            this.timerInterval = setInterval(()=>{
                let min = parseInt(this.minute.textContent);
                let sec = parseInt(this.second.textContent);
                sec--
                if(sec < 0){
                    min = min -1;
                    if(sec<0){
                        setInterval(this.timerInterval);
                        this.timerInterval = null
                    }
                    sec =59;
                }
                this.minute.textContent = (min < 10 ? "0"+min : min);
                this.second.textContent = (sec < 10 ? "0"+ sec : sec);
            },1000)
        }    
    }

    stop(){
        if(this.timerInterval){
            clearInterval(this.setInterval)
            this.timerInterval = null
        }
    }
  }
  
  const timer = new Timer();



startBtn.addEventListener("click",function (){
    if (timer.timerInterval) {
      timer.stop();
       timerInterval = null;
  } else {
      timer.start();
  }
})

