// mainScript.js
export function createTodo(text, todos) {
  const newTodo = { text, done: false };
  return [...todos, newTodo];
}

export function toggleTodoDone(todo, todos) {
  return todos.map((t) =>
    t === todo ? { ...t, done: !t.done } : t
  );
}

export function deleteTodoFromArray(todo, todos) {
  return todos.filter((t) => t !== todo);
}
