"use strict";

/////////////////////////////////////////////////////
var addBtn = document.querySelector('#btn_add');
var inputTask = document.querySelector('#new_task');
var listTask = document.querySelector('#list_task');
var finishListTask = document.querySelector('#finish_task'); //// Add task////

function newTask(task) {
  var taskItem = document.createElement('li');
  taskItem.classList += "todo_item edit";
  taskItem.innerHTML += "\n        <input type=\"checkbox\" class=\"todo_complete\" id=\"task_complete\" name=\"complete\">\n        <label class=\"todo_text\">".concat(task, "</label>\n        <input type=\"text\" class=\"todo-edit_text hide\"></input>\n        <a href=\"#\" class=\"todo_edit\" id=\"btn_edit\"></a>\n        <a href=\"#\" class=\"todo_delete\" id=\"btn_delete\"></a>  \n    ");
  return taskItem;
}

var addNewTask = function addNewTask() {
  if (inputTask.value) {
    var taskItem = newTask(inputTask.value);
    listTask.appendChild(taskItem);
    bindTaskEvent(taskItem, finishTask);
    inputTask.value = "";
  } else {
    alert('Поле вводу пусте');
  }

  save();
};

addBtn.addEventListener('click', addNewTask);

function deleteTask() {
  var listItem = this.parentNode;
  listItem.remove();
  save();
}

function editTask() {
  var editBtn = this;
  var listItem = this.parentNode;
  var label = listItem.querySelector('label');
  var input = listItem.querySelector('input[type=text]');
  var edit = listItem.classList.contains("edit");

  if (edit) {
    input.value = label.innerText;
    input.classList.remove('hide');
    label.classList.add('hide');
    editBtn.classList = "todo_save";
  } else {
    label.innerText = input.value;
    label.classList.remove('hide');
    input.classList.add('hide');
    editBtn.classList = "todo_edit";
  }

  listItem.classList.toggle('edit');
  save();
}

function finishTask() {
  var listItem = this.parentNode;

  if (this.checked) {
    finishListTask.appendChild(listItem);
  } else {
    listTask.appendChild(listItem);
  }

  save();
}

var bindTaskEvent = function bindTaskEvent(listTask, checkboxEvent) {
  var checkbox = listTask.querySelector('#task_complete');
  var editBtn = listTask.querySelector('#btn_edit');
  var deletetBtn = listTask.querySelector('#btn_delete');
  checkbox.addEventListener('click', checkboxEvent);
  editBtn.addEventListener('click', editTask);
  deletetBtn.addEventListener('click', deleteTask);
}; ////// localStorage /////


var save = function save() {
  var taskArr = [];
  var finishedArr = [];

  for (var i = 0; i < listTask.children.length; i++) {
    taskArr.push(listTask.children[i].querySelector('label').innerText);
  }

  for (var _i = 0; _i < finishListTask.children.length; _i++) {
    finishedArr.push(finishListTask.children[_i].querySelector('label').innerText);
  }

  localStorage.removeItem('todo');
  localStorage.setItem('todo', JSON.stringify({
    listTask: taskArr,
    finishListTask: finishedArr
  }));
};

var load = function load() {
  return JSON.parse(localStorage.getItem('todo'));
};

var data = load();

for (var i = 0; i < data.listTask.length; i++) {
  var listItem = newTask(data.listTask[i]);
  listTask.appendChild(listItem);
  bindTaskEvent(listItem, finishTask);
}

for (var _i2 = 0; _i2 < data.finishListTask.length; _i2++) {
  var _listItem = newTask(data.finishListTask[_i2]);

  var check = _listItem.querySelector('input[type=checkbox]');

  check.checked = true;
  finishListTask.appendChild(_listItem);
  bindTaskEvent(_listItem, finishTask);
}