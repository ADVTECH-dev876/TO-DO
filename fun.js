let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

// ---- Utility Functions ----
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function makeID() { return Date.now() + Math.random().toString(36).slice(2,7); }
function todayISO() { return new Date().toISOString().split('T')[0]; }

// ---- Rendering & Filtering ----
const taskList = document.getElementById('task-list');
const categoryFilter = document.getElementById('filter-category');
const priorityFilter = document.getElementById('filter-priority');
const assignedFilter = document.getElementById('filter-assigned');
const searchBox = document.getElementById('search-box');

function renderTasks() {
  // Filtering
  const sf = searchBox.value.toLowerCase();
  const cf = categoryFilter.value;
  const pf = priorityFilter.value;
  const af = assignedFilter.value;

  let filtered = tasks.filter(t =>
    (!cf || t.category === cf) &&
    (!pf || t.priority === pf) &&
    (!af || t.assigned === af) &&
    ( t.title.toLowerCase().includes(sf) ||
      t.category.toLowerCase().includes(sf) ||
      t.tags.join(',').toLowerCase().includes(sf) ||
      t.assigned.toLowerCase().includes(sf) )
  );
