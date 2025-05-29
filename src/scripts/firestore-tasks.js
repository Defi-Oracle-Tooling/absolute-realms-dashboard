// Firestore integration for frontend task management
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { firebaseConfig } from '../../config/firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCol = collection(db, 'tasks');

// List all tasks and render to sidebar
export async function listTasks() {
  const snapshot = await getDocs(tasksCol);
  const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // Dispatch event for sidebar to render
  document.dispatchEvent(new CustomEvent('tasks:list', { detail: tasks }));
  return tasks;
}

// Add a new task
export async function addTask(task) {
  const docRef = await addDoc(tasksCol, task);
  await listTasks();
  return docRef.id;
}

// Update a task
export async function updateTask(id, updates) {
  await updateDoc(doc(tasksCol, id), updates);
  await listTasks();
}

// Delete a task
export async function deleteTask(id) {
  await deleteDoc(doc(tasksCol, id));
  await listTasks();
}

// On load, list tasks
window.addEventListener('DOMContentLoaded', listTasks);
