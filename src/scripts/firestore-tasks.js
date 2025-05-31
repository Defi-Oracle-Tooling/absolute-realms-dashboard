// Firestore integration for frontend task management (dynamic import for bundle splitting)
import { firebaseConfig } from '../../config/firebase-config.js';

let app, db, tasksCol;

async function ensureFirebase() {
  if (!app) {
    const { initializeApp } = await import('firebase/app');
    app = initializeApp(firebaseConfig);
    const { getFirestore, collection } = await import('firebase/firestore');
    db = getFirestore(app);
    tasksCol = collection(db, 'tasks');
  }
  return { db, tasksCol };
}

export async function listTasks() {
  await ensureFirebase();
  const { getDocs } = await import('firebase/firestore');
  const snapshot = await getDocs(tasksCol);
  const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  document.dispatchEvent(new CustomEvent('tasks:list', { detail: tasks }));
  return tasks;
}

export async function addTask(task) {
  await ensureFirebase();
  const { addDoc } = await import('firebase/firestore');
  const docRef = await addDoc(tasksCol, task);
  await listTasks();
  return docRef.id;
}

export async function updateTask(id, updates) {
  await ensureFirebase();
  const { updateDoc, doc } = await import('firebase/firestore');
  await updateDoc(doc(tasksCol, id), updates);
  await listTasks();
}

export async function deleteTask(id) {
  await ensureFirebase();
  const { deleteDoc, doc } = await import('firebase/firestore');
  await deleteDoc(doc(tasksCol, id));
  await listTasks();
}

window.addEventListener('DOMContentLoaded', listTasks);
