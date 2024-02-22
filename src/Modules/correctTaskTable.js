import settingDOM from "./settingDOM.js";

export default function correctTaskTableManage(){
    const {
        containerForTask,
        containerForCorrectTask,
        correctCountPomodoros,
        correctSpan,
        correctPlusBtn,
        correctMinusBtn,
        correctSaveBtn,
        correctDeleteBtn,
        correctCancelBtn,
        containerTask
      } = settingDOM();
      const taskList = document.querySelector(".task-list");
      const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const openTaskBtns = containerTask.querySelectorAll(".open-task")
    // open btn - settings task
    openTaskBtns.forEach((openTask)=>{
        openTask.addEventListener("click", function(){
            if (containerForCorrectTask.style.display === "none") {
              containerForCorrectTask.style.display = "block";
            }

            const discriptionTask = openTask.closest(".task-list").querySelector(".do-task")
            correctSpan.innerHTML = discriptionTask.innerHTML
            const counterPomodoroSpan = openTask.closest(".task-list").querySelector(".count-pomodoro")
            correctCountPomodoros.value = counterPomodoroSpan.textContent.match(/\d+/)[0];
            console.log(correctCountPomodoros)
            containerForTask.remove()
          })
      })

    
    function updateTaskCount(count){
        
        const pomodoroSpan = taskList.querySelector(".count-pomodoro");
        pomodoroSpan.textContent = `/${count}`;
    }
    correctPlusBtn.addEventListener("click", function(){
        let countPomodoro = parseInt(correctCountPomodoros.value);
        countPomodoro++;
        correctCountPomodoros.value = countPomodoro;
        updateTaskCount(countPomodoro)
      })
      
    correctMinusBtn.addEventListener("click", function(){
        let countPomodoro = parseInt(correctCountPomodoros.value);
        if (countPomodoro > 1) {
          countPomodoro--;
          correctCountPomodoros.value = countPomodoro;
          updateTaskCount(countPomodoro)
        }   
    })

    correctCancelBtn.addEventListener("click", function(){
        containerForCorrectTask.remove()
    })

    correctSaveBtn.addEventListener("click", function(){
        //рализовать внесение изменний задачи в savedTasks,без создания новой
        //localStorage
        //перебор savedTasks по индексу
      })
   
    correctDeleteBtn.addEventListener("click",function(){
        //удаление из savedTasks
    })
    
}