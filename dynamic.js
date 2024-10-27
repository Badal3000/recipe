const container = document.querySelector(".page-container");
let recipesArray = [];
let page = 1;
let pageSize = 8;
let totalDataCount = 0;
let totalpagecount = 0;
let pages = [];
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");


function fetchData() {
    setDetails(recipes);
}

function setDetails(data) {
    recipesArray = data;
    totalDataCount = recipesArray.length;
    totalpagecount = Math.ceil(totalDataCount / pageSize);
    showData();
    addPagination();
}

function showData() {
    const content = document.querySelector(".content");
    content.innerHTML = "";
    const newData = recipesArray.slice((page - 1) * pageSize, page * pageSize);
    pushCards(newData);
    updateActive();
    updateTruncation();
}

function pushCards(data) {
    const content = document.querySelector(".content");
    data.forEach(item => {
        const newCard = document.createElement('div');
        newCard.classList.add("card");
        const images = document.createElement('img');
        images.classList.add("card-img");
        images.src=item.image;
        const ingName = document.createElement('div');
        ingName.classList.add("food-name");
        ingName.textContent = item.name;
        const ingredientsReq = document.createElement('div');
        ingredientsReq.classList.add("req-ing");
        ingredientsReq.innerText = "Ingredients : " + item.ingredients;
        const instructions = document.createElement('div');
        instructions.classList.add("instructions");
        instructions.textContent = "How to cook : " + item.instructions;
        const tag = document.createElement('div');
        tag.classList.add("tags");
        tag.textContent = "tags : " + item.tags;
        newCard.append(images,ingName,ingredientsReq, instructions, tag);
        content.append(newCard);
    });
}

function addPagination() {
    const paginationContainer = document.querySelector(".pagination");
    pages.forEach(page => page.remove()); 
    for (let i = 1; i <= totalpagecount; i++) {
        const newPage = document.createElement("btn");
        newPage.classList.add("btn");
        newPage.innerHTML = i;
        paginationContainer.insertBefore(newPage, next);
        pages.push(newPage);
    }
    addEventListeners();
}

function addEventListeners() {
    pages.forEach(btn => {
        btn.addEventListener("click", () => {
            page = Number(btn.innerText);
            showData();
        });
    });
    prev.addEventListener("click", () => {
        if (page > 1) page--;
        showData();
    });
    next.addEventListener("click", () => {
        if (page < totalpagecount) {
            page++;
            showData();
        }
    });
}

function updateActive() {
    pages.forEach((btn) => {
        if(page === Number(btn.innerText))
            btn.classList.add("active");
        else
            btn.classList.remove("active");
    });
}


function updateTruncation(){
    if(totalpagecount<8) return;
    pages.forEach(btn=>{
        let num = Number(btn.innerText);
        let Shouldtruncate = num > 2 && (num<page-1  ||  num>page+1) && num < totalpagecount-1;
        let ShouldNotTruncate = (page<5 && num<=5) || (num>=totalpagecount - 4 && page>totalpagecount -4);
        console.log(num, page, totalpagecount)
        if(page>4){ 
            pages[1].classList.add("truncated");

        }
        else pages[1].classList.remove("truncated");
        if(page<totalpagecount-3){
            pages[totalpagecount-2].classList.add("truncated");

        }
        else{
            pages[totalpagecount-2].classList.remove("truncated");
        }
        if(Shouldtruncate && !ShouldNotTruncate) btn.style.display = "none";
        // if (Shouldtruncate)  btn.style.display = "none";
        else btn.style.display = "flex";
    });  
}



function runApp(){
    fetchData();
    updateActive();
    updateTruncation();
}
runApp();
