// AI Task Generator: calls backend to generate a new task using OpenAI
const aiForm = document.createElement('form');
aiForm.id = 'ai-generator-form';
aiForm.innerHTML = `
  <input type="text" id="ai-prompt" placeholder="Enter prompt for AI task" required />
  <button type="submit">Generate Task</button>
`;
document.body.appendChild(aiForm);

aiForm.onsubmit = async e => {
  e.preventDefault();
  const prompt = document.getElementById('ai-prompt').value;
  if (!prompt) return;
  try {
    const res = await fetch('/generate-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    if (!res.ok) throw new Error('Failed to generate task');
    const data = await res.json();
    alert('Task generated: ' + (data.description || data.prompt));
    document.getElementById('ai-prompt').value = '';
    // Optionally trigger task list refresh
    document.dispatchEvent(new CustomEvent('tasks:list', { detail: [data] }));
  } catch (err) {
    alert('Error: ' + err.message);
  }
};
