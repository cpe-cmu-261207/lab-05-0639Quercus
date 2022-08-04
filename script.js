const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;

  if (inputAdd.value === "") {
    alert("Todo cannot be empty");
    return;
  }

  todoCtn.prepend(addTodo(inputAdd.value, false));
  inputAdd.value = "";
  saveTodo();
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";
  doneBtn.style.display = "none";
  doneBtn.onclick = () => {
    completed = true;
    span.style.textDecoration = "line-through";
    saveTodo();
  };

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";
  deleteBtn.style.display = "none";
  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };

  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };

  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  console.log(div.getElementsByTagName("span")[0].innerText);
  return div;
}

function saveTodo() {
  const data = [];
  for (const div of todoCtn.children) {
    const span = div.getElementsByTagName("span")[0];
    data.push({
      title: span.innerText, // It works!?
      completed: span.style.textDecoration === "line-through",
    });
  }
  const dataStr = JSON.stringify(data);
  console.log("saving : " + dataStr);
  localStorage.setItem("todoList", dataStr);
}

function loadTodo() {
  const dataStr = localStorage.getItem("todoList");
  data = JSON.parse(dataStr);

  todoCtn.innerHTML = "";
  for (const span of data)
    todoCtn.appendChild(addTodo(span.title, span.completed));
}

loadTodo();
