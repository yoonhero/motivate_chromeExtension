const koreanSelect = document.querySelector(".koreanSelect")
const englishSelect = document.querySelector(".englishSelect")

function koreanSel() {
    chrome.storage.sync.set({ "value": "KR" }, function () {
        // 저장 완료
    });
    koreanSelect.classList.remove("is-active")
    koreanSelect.classList.add("is-active")
    englishSelect.classList.remove("is-active")

}

function englishSel() {
    chrome.storage.sync.set({ "value": "EN" }, function () {
        // 저장 완료
    });
    englishSelect.classList.remove("is-active")
    englishSelect.classList.add("is-active")
    koreanSelect.classList.remove("is-active")
}

function init() {
    koreanSelect.addEventListener("click", koreanSel)
    englishSelect.addEventListener("click", englishSel)
    let LS_VALUE = ""
    chrome.storage.sync.get("value", function (items) {
        LS_VALUE = items.value;
        if (LS_VALUE == "KR") {
            koreanSelect.classList.add("is-active")
        }
        else if (LS_VALUE == 'EN') {
            englishSelect.classList.add("is-active")
        }
    });


}

window.onload = init