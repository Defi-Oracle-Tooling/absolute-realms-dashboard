const admin = require('firebase-admin');
require('../config/env-loader');
const { firebaseConfig } = require('../config/firebase-config');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    ...firebaseConfig,
  });
}
const db = admin.firestore();

/** Create a new task document */
async function createTask(data) {
  const docRef = await db.collection('tasks').add(data);
  return docRef;
}

/** Update an existing task by ID */
async function updateTask(id, data) {
  await db.collection('tasks').doc(id).update(data);
}

/** Get a task by ID */
async function getTask(id) {
  const doc = await db.collection('tasks').doc(id).get();
  return { id: doc.id, ...doc.data() };
}

/** List all tasks */
async function listTasks() {
  const snapshot = await db.collection('tasks').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/** Delete a task by ID */
async function deleteTask(id) {
  await db.collection('tasks').doc(id).delete();
}

module.exports = { createTask, updateTask, getTask, listTasks, deleteTask };