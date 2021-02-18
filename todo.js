const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";
let toDos = [];

function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {

    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "✔️";
    delBtn.addEventListener("click", deleteToDo);
    const span1 = document.createElement("span");
    const newId = toDos.length + 1;

    span1.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span1);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: toDos.length + 1,
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
    saveToDos();
}

function loadToDos() {
    const lodedToDos = localStorage.getItem(TODOS_LS);
    if (lodedToDos !== null) {
        const parsedToDos = JSON.parse(lodedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoform.addEventListener("submit", handleSubmit);
}

init();