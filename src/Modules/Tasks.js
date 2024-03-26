class Tasks {
  constructor() {
    this.inputWriteTask = document.querySelector(".input-task");
    this.plusBtn = document.querySelector(".plus-btn");
    this.minusBtn = document.querySelector(".minus-btn");
    this.countInput = document.querySelector(".count-pomodoros");
    this.correctCountPomodoros = document.querySelector(".correct-count-pomodoros1");
    this.correctSpan = document.querySelector(".counter-tasks");
    this.correctPlusBtn = document.querySelector(".correct-plus-btn");
    this.correctMinusBtn = document.querySelector(".correct-minus-btn");
    this.loadTasks()
    this.callEventListener();
  }

  loadTasks() {
    this.savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.savedTasks));
  }

  //get current tasl list
  getTasks() {
    return this.savedTasks;
  }

  addTask(textInput, pomodoroCount) {
    const task = {
      id: Date.now(),
      textInput,
      pomodoroCount,
    };
    this.savedTasks.push(task);
    this.saveTasks();
  }

  deleteTask(taskId) {
    this.savedTasks = this.savedTasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }
  //btns
  callEventListener() {
    this.plusBtn.addEventListener("click", () => {
      this.incrementCount();
    });

    this.minusBtn.addEventListener("click", () => {
      this.decrementCount();
    });
  }

  //ОСТАВИТЬ
  updateTaskCount(count) {
    const pomodoroSpan = this.taskList.querySelector(".count-pomodoro");
    pomodoroSpan.textContent = `/${count}`;
  }

  incrementCount() {
    this.countInput.value++;
    this.counterPomodoro();
  }

  decrementCount() {
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

export default Tasks;
