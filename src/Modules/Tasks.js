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
        task.completedPomodoros = (task.completedPomodoros || 0) + 1;
        this.saveTasks();
        //если кол-во заданных и потраченных помидорок равны 
        if(task.completedPomodoros === task.pomodoroCount){
          //то задача выполнена
          task.isComplite = true
        }
    }
  }
}

export default Tasks;
