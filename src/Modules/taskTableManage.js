import settingDOM from "./settingDOM.js";
// import correctTaskTableManage from "./Modules/correctTaskTable.js";

export default function taskTableManage() {
  const {
    addTaskButton,
    counterSpan,
    saveBtn,
    correctSaveBtn,
    inputWriteTask,
    containerTask,
    plusBtn,
    minusBtn,
    countInput,
    containerForTask,
    containerForCorrectTask,
  } = settingDOM();

  //save tasks from local storage
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //saved tasks onto the page
  savedTasks.forEach((savedTask) => {
    const taskList = createTaskElement(savedTask);
    containerTask.appendChild(taskList);
  });

  countTask();

  //open table for create task
  addTaskButton.addEventListener("click", function () {
    if (containerForTask.style.display === "none") {
      containerForTask.style.display = "block";
    } else {
      containerForTask.style.display = "none";
    }
    addTaskButton.remove();
  });

  //save task and add in container-task
  function saveTask(event) {
    event.preventDefault();

    const textInput = inputWriteTask.value;
    const pomodoroCount = countInput.value;
    if (textInput.trim() === "") {
      inputWriteTask.placeholder = "Add your text";
      return;
    }

    const task = { textInput, pomodoroCount };
    const taskList = createTaskElement(task);
    containerTask.appendChild(taskList);
    savedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    inputWriteTask.value = "";
    countInput.value = "";
    countTask();
  }

  saveBtn.addEventListener("click", saveTask);
  correctSaveBtn.addEventListener("click", saveTask);

  //сreate task
  function createTaskElement(task) {
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
    // const deleteCorrectBtn = document.querySelector(".correct-delete-task");

    function deleteTask() {
      taskList.remove();
      const taskIndex = savedTasks.indexOf(task);
      if (taskIndex !== -1) {
        savedTasks.splice(taskIndex, 1);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));
      }
      countTask();
    }
    deleteBtn.addEventListener("click", deleteTask);
    // deleteCorrectBtn.addEventListener("click", deleteTask)

    return taskList;
  }

 

  //count tasks
  function countTask() {
    const count = savedTasks.length;
    counterSpan.innerHTML = `#${count}`;
  }
  console.log(savedTasks);

  //setting count pomodoro

  let countPomodoro = document.querySelector(".count-pomodoro");
  countInput.value = 1;

  function counterPomodoro() {
    console.log(countPomodoro);
    if (countPomodoro) {
      countPomodoro.innerHTML = `/${countInput.value}`;
    }
  }
  console.log(countPomodoro);
  plusBtn.addEventListener("click", function () {
    countInput.value++;
    counterPomodoro();
  });

  minusBtn.addEventListener("click", function () {
    countInput.value--;
    if (countInput.value <= 1) {
      countInput.value = 1;
    }
    counterPomodoro();
  });

  // correctTaskTableManage()
}
