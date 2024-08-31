let taskList = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    let taskInput = document.getElementById('task-input');
    let task = taskInput.value.trim();
    if (task) {
        let taskItem = {
            text: task,
            completed: false,
            timestamp: new Date().toLocaleString()
        };
        taskList.push(taskItem);
        taskInput.value = '';
        displayTasks();
    }
}

function displayTasks() {
    let pendingTaskListElement = document.getElementById('pending-task-list');
    let completedTaskListElement = document.getElementById('completed-task-list');
    pendingTaskListElement.innerHTML = '';
    completedTaskListElement.innerHTML = '';
    taskList.forEach((taskItem) => {
        let taskElement = document.createElement('li');
        taskElement.className = 'task-item';
        taskElement.textContent = `${taskItem.text} - Added on ${taskItem.timestamp}`;
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', () => {
            let newTaskText = prompt('Enter new task text:', taskItem.text);
            if (newTaskText) {
                taskItem.text = newTaskText;
                displayTasks();
            }
        });
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            taskList.splice(taskList.indexOf(taskItem), 1);
            displayTasks();
        });
        let completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            taskItem.completed = true;
            displayTasks();
        });
        taskElement.appendChild(editBtn);
        taskElement.appendChild(deleteBtn);
        taskElement.appendChild(completeBtn);
        if (taskItem.completed) {
            completedTaskListElement.appendChild(taskElement);
        } else {
            pendingTaskListElement.appendChild(taskElement);
        }
    });
}

displayTasks();