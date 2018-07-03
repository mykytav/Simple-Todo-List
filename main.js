
// if in localStorage there is todoList object then parse it through JSON
// otherwise return an empty object with arrays
const data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  todo: [],
  completed: [],
};
// As we just setItem in our dataObjectUpdated we haven't fetch it yet
// so that we call it here as soon as the script will load
// console.log(JSON.parse(localStorage.getItem('todoList')));

// SVG complete and remove
const removeSVG = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>`;

const completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

//  Render list
const renderTodoList = () => {
  if (!data.todo.length && !data.completed.length) return;

  for (let elem of data.todo) {
    const value = elem;
    addItemToDOM(value);
  }

  for (let elem of data.completed) {
    const value = elem;
    addItemToDOM(value, true);
  }
}

//  set JSON.stringify data to the localStorage
const dataObjectUpdated = () => {
  localStorage.setItem('todoList', JSON.stringify(data));
}

// Delete item from the lists
function removeItem() {
  const item = this.parentNode.parentNode;
  const parent = item.parentNode;
  const id = parent.id;
  const value = item.textContent;

  if (id === 'todo') {
    data.todo.splice(data.todo.indexOf(value), 1);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
  }

  dataObjectUpdated();

  parent.removeChild(item);
}

// Moves item to the completed list
function completeItem() {
  const item = this.parentNode.parentNode;
  const parent = item.parentNode;
  const id = parent.id;
  // Grab text from our item
  const value = item.textContent;

  if (id === 'todo') {
    // cut it from our todo list
    data.todo.splice(data.todo.indexOf(value), 1);
    // And paste it in complete list
    data.completed.push(value);
  } else {
    data.completed.splice(data.completed.indexOf(value), 1);
    // And paste it in complete list
    data.todo.push(value);
  }

  dataObjectUpdated();

  const target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');
  parent.removeChild(item);
  target.insertBefore(item, target.childNodes[0]);
}

// Adds item to the todo list
const addItemToDOM = (text, completed) => {
  const list = (completed) ? document.getElementById('completed') : document.getElementById('todo');
  const item = document.createElement('li');
  item.innerHTML = text;
  item.contentEditable = 'true';

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.innerHTML = removeSVG;
  // Add click event for removing the item
  removeButton.addEventListener('click', removeItem);

  const completeButton = document.createElement('button');
  completeButton.classList.add('complete');
  completeButton.innerHTML = completeSVG;
  // Add click event for completing the item
  completeButton.addEventListener('click', completeItem);

  buttons.appendChild(removeButton);
  buttons.appendChild(completeButton);
  item.appendChild(buttons);
  list.insertBefore(item, list.childNodes[0]);
}

const addItem = (value) => {
  addItemToDOM(value);
  document.getElementById('item').value = '';
  data.todo.push(value);
  dataObjectUpdated();
}

document.getElementById('add').addEventListener('click', () => {
  const value = document.getElementById('item').value;
  if (value) {
    addItem(value);
  }
});

document.getElementById('item').addEventListener('keydown', function (e) {
  const value = this.value;
  if (e.code === 'Enter' && value) {
    addItem(value);
  }
});

// We need to run it after the variable of SVG was declared
renderTodoList();
