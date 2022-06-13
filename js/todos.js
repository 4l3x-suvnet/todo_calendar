let todoItems = [];

const add = document.querySelector('.add');

function renderTodo(todo) {
  const list = document.querySelector('.todo-list');
  const itemContainer = document.createElement('div');
  const item = document.createElement('div');
  const remove = document.createElement('button');

  itemContainer.classList.add('item-container');
  item.classList.add('item');

  item.innerHTML = todo.text;
  remove.innerHTML = 'Remove';

  list.append(itemContainer);
  itemContainer.append(item);
  itemContainer.append(remove);

  remove.addEventListener('click', () => removeTodo(itemContainer));
}

function removeTodo(itemContainer) {
  itemContainer.parentNode.removeChild(itemContainer);
}

function addTodo(text) {
  const todo = {
    text,
  };

  todoItems.push(todo);
  renderTodo(todo);
}

add.addEventListener('click', () => {
  const input = document.querySelector('.todo-input');

  const text = input.value;

  if (text !== '') {
    addTodo(text);
    input.value = '';
  }
});
