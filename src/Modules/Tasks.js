class Tasks {
  constructor() {
    this.inputWriteTask = document.querySelector(".input-task");
 
    this.correctCountPomodoros = document.querySelector(".correct-count-pomodoros1");
    this.correctSpan = document.querySelector(".counter-tasks");
    this.correctPlusBtn = document.querySelector(".correct-plus-btn");
    this.correctMinusBtn = document.querySelector(".correct-minus-btn");
    this.loadTasks()
  }

  loadTasks() {
    this.savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.savedTasks));
  }

  //get current tasks list
  getTasks() {
    return this.savedTasks;
  }
  //возврат зопределенной задачи из массива
  getTaskById(taskId) {
    return this.savedTasks.find(task => task.id === taskId);
  }
  addTask(textInput, pomodoroCount) {
    const task = {
      id: Date.now(),
      textInput,
      completedPomodoros: 0,
      pomodoroCount,
    };
    this.savedTasks.push(task);
    this.saveTasks();
  }

  deleteTask(taskId) {
    this.savedTasks = this.savedTasks.filter(task => task.id !== taskId);
    this.saveTasks();
  }

  //управление использованными помидорками
  handlePomodoroComplete(activeTaskId) {
    const task = this.savedTasks.find(task => task.id === activeTaskId);
    if (task) {
        //проверка на не превышение законченых задач
        if (task.completedPomodoros < task.pomodoroCount) {
            task.completedPomodoros++;
            //если кол-во выполненных и заданных равно - выполнено
            if (task.completedPomodoros === task.pomodoroCount) {
                task.isComplete = true;
            }
        }
        this.saveTasks();
    }
  }

  updateTaskCompletion(taskId) {
    const task = this.savedTasks.find(task => task.id === taskId);
    if (task) {
        task.isCompleted = !task.isCompleted; 
        this.saveTasks();
    }
  }

  updateTask(taskId, newText, newPomodoroCount) {
    const task = this.savedTasks.find(task => task.id === taskId);
    if (task) {
        task.textInput = newText;
        task.pomodoroCount = newPomodoroCount;
        this.saveTasks();
    }
  }

}
export default Tasks;
