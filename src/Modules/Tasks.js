class Tasks {
  constructor() {
    this.inputWriteTask = document.querySelector(".input-task");
    this.loadTasks()
  }

  loadTasks() {
    this.savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  }

  updateTasksInStorage() {
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
    this.updateTasksInStorage();
  }

  deleteTask(taskId) {
    this.savedTasks = this.savedTasks.filter(task => task.id !== taskId);
    this.updateTasksInStorage();
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
        this.updateTasksInStorage();
    }
  }

  updateTaskCompletion(taskId) {
    const task = this.savedTasks.find(task => task.id === taskId);
    if (task) {
        task.isCompleted = !task.isCompleted; 
        this.updateTasksInStorage();
    }
  }

  updateTask(taskId, newText, newPomodoroCount) {
    const task = this.savedTasks.find(task => task.id === taskId);
    if (task) {
        task.textInput = newText;
        task.pomodoroCount = newPomodoroCount;
        this.updateTasksInStorage();
    }
  }

  deleteAllTasks() {
    this.savedTasks = [];
    this.updateTasksInStorage();
  }
  
  deleteCompletedTasks() {
    this.savedTasks = this.savedTasks.filter(task => !task.isComplete);
    this.updateTasksInStorage();
  
}
}
export default Tasks;
