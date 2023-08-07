document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.querySelector('.task-form');
    const addTaskButton = document.getElementById('addTask');
    const shareButton = document.getElementById('share');
    const taskList = document.getElementById('taskList');
  
    // Initialize tasks from LocalStorage (if any)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to render tasks on the page
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
          <strong>${task.title}</strong><br>
          <span>${task.description}</span><br>
          <span>Due Date: ${task.dueDate}</span><br>
          <span>Priority: ${task.priority}</span><br>
          <button class="delete-task" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(taskItem);
      });
    }
  
    // Function to add a new task to the tasks array and render the updated list
    function addTask() {
      const title = document.getElementById('title').value;
      const description = document.getElementById('description').value;
      const dueDate = document.getElementById('dueDate').value;
      const priority = document.getElementById('priority').value;
  
      const newTask = { title, description, dueDate, priority };
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
  
      renderTasks();
    }
  
    // Function to handle task deletion
    function deleteTask(index) {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    }
  
    // Function to generate and display the sharing URL
    function shareData() {
      const sharedData = JSON.stringify(tasks);
      const uniqueIdentifier = uuid.v4();
      const sharingUrl = `${window.location.href.split('?')[0]}?data=${uniqueIdentifier}`;
  
      localStorage.setItem(uniqueIdentifier, sharedData);
  
      const shareUrlContainer = document.createElement('div');
      shareUrlContainer.classList.add('share-url');
      shareUrlContainer.textContent = `Share this URL: ${sharingUrl}`;
      taskList.appendChild(shareUrlContainer);
    }
  
    addTaskButton.addEventListener('click', addTask);
    taskList.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-task')) {
        const index = event.target.getAttribute('data-index');
        deleteTask(index);
      }
    });
    shareButton.addEventListener('click', shareData);
  
    // Initial rendering of tasks on page load
    renderTasks();
  });
  