const search_url = "https://www.google.com/search?q="

function searching(event){
    event.preventDefault();
    const searchVal = document.querySelector(".searchbar").value;
    document.querySelector(".searchbar").value = ""
    window.location.href = search_url+searchVal;
}

function search(){
    const searchForm = document.querySelector(".search_form");
    searchForm.addEventListener("submit", searching);
    document.querySelector(".search_button").addEventListener("click", searching);
}

search()