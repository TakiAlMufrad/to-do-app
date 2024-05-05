import {
  createTodo,
  toggleTodoDone,
  deleteTodoFromArray,
} from './mainScript.js';

const form = document.getElementById('mainForm');
const input = document.getElementById('inputForm');
const todoListDiv = document.getElementById('todoListDiv');

const KEY = 'todos';

const todos = JSON.parse(localStorage.getItem(KEY) || '[]');

function updateUI() {
  while (todoListDiv.firstChild) {
    todoListDiv.removeChild(todoListDiv.firstChild);
  }

  todos.forEach((todo) => {
    const item = document.createElement('li');

    const paragraph = document.createElement('p');
    const deleteButton = document.createElement('button');

    const doneButton = document.createElement('button');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    doneButton.textContent = 'Done!';

    editButton.addEventListener('click', () => {
      const editedText = prompt('Please type in your edited To-Do.');
      if (editedText !== null) {
        const updatedTodos = todos.map((t) =>
          t === todo ? { ...t, text: editedText } : t
        );
        saveAndUpdateUI(updatedTodos);
      }
    });

    doneButton.addEventListener('click', () => {
      const updatedTodos = toggleTodoDone(todo, todos);
      saveAndUpdateUI(updatedTodos);
    });

    if (todo.done) {
      paragraph.style.textDecoration = 'line-through';
    }

    paragraph.textContent = todo.text;
    deleteButton.textContent = 'delete';

    deleteButton.addEventListener('click', () => {
      const updatedTodos = deleteTodoFromArray(todo, todos);
      saveAndUpdateUI(updatedTodos);
    });

    item.appendChild(paragraph);
    item.appendChild(deleteButton);
    item.appendChild(doneButton);
    item.appendChild(editButton);
    todoListDiv.appendChild(item);
  });
}

function saveAndUpdateUI(updatedTodos) {
  localStorage.setItem(KEY, JSON.stringify(updatedTodos));
  todos.length = 0;
  todos.push(...updatedTodos);
  updateUI();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const todoText = input.value.trim();
  if (todoText) {
    const updatedTodos = createTodo(todoText, todos);
    saveAndUpdateUI(updatedTodos);
    input.value = '';
  }
});

// Initial UI setup
updateUI();
