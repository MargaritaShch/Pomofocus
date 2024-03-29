export function createTaskElement(task){
  const isChecked = task.isCompleted ? 'checked' : '';
    return `
      <label class="do-task">
        <input type="checkbox" class="checkbox" ${isChecked}>
        <span>${task.textInput}</span>
      </label>
      <div class="right-side">
        <span class="use-pmodoro">${task.completedPomodoros || 0}</span><span class="count-pomodoro">/${task.pomodoroCount}</span> 
        <button class="open-task">open</button>
        <button class="delete-task">&#10006;</button>
      </div>
    </div>
    `
}