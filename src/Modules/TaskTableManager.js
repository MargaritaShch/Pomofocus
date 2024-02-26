import settingDOM from "./settingDOM.js";


class TaskTableManager {
  constructor(){
    const {
      addTaskButton,
      counterSpan,
      saveBtn,
      correctSaveBtn,
      inputWriteTask,
      plusBtn,
      minusBtn,
      countInput,
      containerForTask,
      containerForCorrectTask,
      correctCountPomodoros,
      correctSpan,
      correctPlusBtn,
      correctMinusBtn,
      correctDeleteBtn,
      correctCancelBtn,
      containerTask
    } = settingDOM();

    this.addTaskButton = addTaskButton;
    this.counterSpan = counterSpan;
    this.saveBtn = saveBtn;
    this.correctSaveBtn = correctSaveBtn;
    this.inputWriteTask = inputWriteTask;
    this.containerTask = containerTask;
    this.plusBtn = plusBtn;
    this.minusBtn = minusBtn;
    this.countInput = countInput;
    this.containerForTask = containerForTask;
    this.containerForCorrectTask = containerForCorrectTask;
    this.correctCountPomodoros = correctCountPomodoros;
    this.correctSpan = correctSpan;
    this.correctPlusBtn = correctPlusBtn;
    this.correctMinusBtn = correctMinusBtn;
    this.correctDeleteBtn = correctDeleteBtn;
    this.correctCancelBtn = correctCancelBtn;
    this.savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    this.callEventListener()
    this.getSavedTasks();
  }
 
  //btns
  callEventListener(){
    this.addTaskButton.addEventListener("click", (event)=> {
      this.getEventTaskContainer(event)
    });

    this.saveBtn.addEventListener("click", (event)=>{
      this.saveTask(event)
    });

    this.correctSaveBtn.addEventListener("click", (event)=>{
      this.saveTask(event)
    });

    this.plusBtn.addEventListener("click", () =>{
      this.incrementCount()
    });
  
    this.minusBtn.addEventListener("click", () =>{
      this.decrementCount();
    });
  }
  
   //сreate task
   createTaskElement(task) {
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

    //click DEL btns in task
    const deleteBtn = taskList.querySelector(".delete-task");
    deleteBtn.addEventListener("click", ()=>{
      this.deleteTask(taskList, task)
    })
    // const deleteCorrectBtn = document.querySelector(".correct-delete-task");
    return taskList;
  }
  
  //saved tasks onto the page
  getSavedTasks(){
    this.savedTasks.forEach((savedTask) => {
      const taskList = this.createTaskElement(savedTask);
      this.containerTask.appendChild(taskList);
    });

    this.countTask();
  }
 
  //render task table
  getEventTaskContainer(){
    if (this.containerForTask.style.display === "none") {
      this.containerForTask.style.display = "block";
    } else {
      this.containerForTask.style.display = "none";
    }
    this.addTaskButton.remove();
  }

  //render correct table
  getEventCorrectContainer(){
    const openTaskBtns = containerTask.querySelectorAll(".open-task")
    openTaskBtns.forEach((openTask)=>{
      openTask.addEventListener("click", () => {
        if (this.containerForCorrectTask.style.display === "none") {
          this.containerForCorrectTask.style.display = "block";
        }
        const discriptionTask = openTask.closest(".task-list").querySelector(".do-task");
        this.correctSpan.innerHTML = discriptionTask.innerHTML;
        const counterPomodoroSpan = openTask.closest(".task-list").querySelector(".count-pomodoro");
        this.correctCountPomodoros.value = counterPomodoroSpan.textContent.match(/\d+/)[0];
        this.containerForTask.remove();
      })
    });
    
}
  
  // updateTaskCount(count){
  //   const pomodoroSpan = this.taskList.querySelector(".count-pomodoro");
  //   pomodoroSpan.textContent = `/${count}`;
  // }
  //save task and add in container-task
  saveTask(event) {
    event.preventDefault();
    const textInput = this.inputWriteTask.value;
    const pomodoroCount = this.countInput.value;

    if (textInput.trim() === "") {
      this.inputWriteTask.placeholder = "Add your text";
      return;
    }

    const task = { textInput, pomodoroCount };
    const taskList = this.createTaskElement(task);
    this.containerTask.appendChild(taskList);
    this.savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(this.savedTasks));
    this.inputWriteTask.value = "";
    this.countInput.value = "";
    this.countTask();
  }

  deleteTask(taskList, task) {
    taskList.remove();
    const taskIndex = this.savedTasks.indexOf(task);
    if (taskIndex !== -1) {
      this.savedTasks.splice(taskIndex, 1);
      localStorage.setItem("tasks", JSON.stringify(this.savedTasks));
    }
    this.countTask();
  }

  cancleBtn(){
      this.correctCancelBtn.addEventListener("click", function(){
        this.containerForCorrectTask.remove()
    })
  }

    //count tasks
  countTask() {
    const count = this.savedTasks.length;
    this.counterSpan.innerHTML = `#${count}`;
  }

    incrementCount(){
      this.countInput.value++;
      this.counterPomodoro();
    }

    decrementCount(){
      this.countInput.value--;
      if (this.countInput.value <= 1) {
        this.countInput.value = 1;
      }
      this.counterPomodoro();
    }

    counterPomodoro() {
      let countPomodoro = document.querySelector(".count-pomodoro");
      if (countPomodoro) {
        countPomodoro.innerHTML = `/${this.countInput.value}`;
      }
    }

}

export default TaskTableManager;