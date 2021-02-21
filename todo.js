const textInput = document.querySelector(".input_text");
const textForm = document.querySelector(".form");
const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";
const pendingLi = document.querySelector(".pending_li");
const finishedLi = document.querySelector(".finished_li");

let toDos = [];

function paintToDo(value, trigger) {
    const li = document.createElement("li");
    const delBtn = document.createElement("i");

    delBtn.classList.add("fas")
    delBtn.classList.add("fa-trash")

    delBtn.addEventListener("click", deleteToDo);
    const doneBtn = document.createElement("i");
    doneBtn.classList.add("fas")
    if (!trigger) {
        doneBtn.classList.add("fa-check")
        doneBtn.addEventListener("click", doneTodo);
    } else {
        doneBtn.classList.add("fa-backward")
        doneBtn.addEventListener("click", notDoneTodo);
    }

    const span1 = document.createElement("span");
    const newId = toDos.length + 1;
    span1.innerText = value;

    li.appendChild(span1);
    li.appendChild(doneBtn);
    li.appendChild(delBtn);
    li.id = newId;
    if (!trigger) {
        pendingLi.appendChild(li);
    } else {
        finishedLi.appendChild(li);
    }

    const toDoObj = {
        text: value,
        id: toDos.length + 1,
        done: trigger
    };
    toDos.push(toDoObj);
    saveToDos();
}
function saveToDos() {
    var pending = [];
    var finished = [];
    toDos.map((toDo) => {
        if (toDo.done) {
            finished.push(toDo);
        } else {
            pending.push(toDo);
        }
    });
    localStorage.setItem(PENDING_LS, JSON.stringify(pending));
    localStorage.setItem(FINISHED_LS, JSON.stringify(finished));
}
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    const list = li.parentNode;
    list.removeChild(li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}
function doneTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedLi.appendChild(li);
    //pendingLi.removeChild(li);
    btn.classList.remove("fa-check")
    btn.classList.add("fa-backward")
    toDos.map((toDo) => {
        if (toDo.id === parseInt(li.id)) {
            toDo.done = true;
        }
    });

    btn.addEventListener("click", notDoneTodo);
    btn.removeEventListener("click", doneTodo);
    saveToDos();
}
function notDoneTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    pendingLi.appendChild(li);
    //finishedLi.removeChild(li);
    btn.classList.remove("fa-backward")
    btn.classList.add("fa-check")
    toDos.map((toDo) => {
        if (toDo.id === parseInt(li.id)) {
            toDo.done = false;
        }
    });
    btn.removeEventListener("click", notDoneTodo);
    btn.addEventListener("click", doneTodo);
    saveToDos();
}
function handleSubmit(event) {
    event.preventDefault();
    const value = textInput.value;
    paintToDo(value, false);
    textInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(PENDING_LS);
    const loadedDoneToDos = localStorage.getItem(FINISHED_LS);

    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text, false);
        });
    }
    if (loadedDoneToDos !== null) {
        const parsedToDos = JSON.parse(loadedDoneToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text, true);
        });
    }
}

function init() {
    loadToDos();
    textForm.addEventListener("submit", handleSubmit);
}

init();