// Sidebar UI for task navigation and details
import { listTasks, addTask, updateTask, deleteTask } from './firestore-tasks.js';

const sidebar = document.createElement('aside');
sidebar.id = 'task-sidebar';
sidebar.innerHTML = '<h2>Tasks</h2><ul id="task-list"></ul>';
document.body.appendChild(sidebar);

const taskList = sidebar.querySelector('#task-list');

function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.description || task.prompt || 'Untitled';
    li.onclick = () => showTaskDetail(task);
    taskList.appendChild(li);
  });
}

function showTaskDetail(task) {
  let detail = document.getElementById('task-detail');
  if (!detail) {
    detail = document.createElement('div');
    detail.id = 'task-detail';
    document.body.appendChild(detail);
  }
  detail.innerHTML = `<h3>Task Detail</h3><pre>${JSON.stringify(task, null, 2)}</pre>`;
}

document.addEventListener('tasks:list', e => renderTasks(e.detail));
