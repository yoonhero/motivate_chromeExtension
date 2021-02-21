function saveName(event) {
    event.preventDefault()
    const nameInput = document.querySelector(".nameInput")
    var welcomeText = ["Good Morning, ", "Hello, ", "Welcome, ", "좋은 하루 되세요, ", "오늘도 힘내세요, ", "힘내요!! ", "어제보다 나은 오늘을 만들어요, "]
    if (nameInput.value != null) {
        localStorage.setItem("name", nameInput.value);
        document.querySelector(".page").classList.add("hidden")
        document.querySelector(".userName").innerText = nameInput.value
        var index = Math.floor(Math.random() * welcomeText.length)
        document.querySelector(".sayHello").innerText = welcomeText[index]
    } else {
        return
    }
}

function init() {
    const nameForm = document.querySelector(".nameForm")

    nameForm.addEventListener("submit", saveName)


    var name = localStorage.getItem("name")
    var welcomeText = ["Good Morning, ", "Hello, ", "Welcome, ", "좋은 하루 되세요, ", "오늘도 힘내세요, ", "힘내요!! ", "어제보다 나은 오늘을 만들어요, "]
    if (name != null) {
        document.querySelector(".userName").innerText = name
        var index = Math.floor(Math.random() * welcomeText.length)
        document.querySelector(".sayHello").innerText = welcomeText[index]
    } else {
        document.querySelector(".page").classList.remove("hidden")
    }
}

init()