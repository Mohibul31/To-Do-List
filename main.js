const inputBox  = document.getElementById("input-box");
const listContainer  = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        let undoneImg = document.createElement("img");
        undoneImg.src = "undone.png";
        undoneImg.id = "mark-list";
        let crossImg = document.createElement("img");
        crossImg.src = "cross.png";
        crossImg.id = "delet-list";
        
        let task = "pending";
        
        li.innerHTML = inputBox.value;
        li.appendChild(undoneImg);
        li.appendChild(crossImg);
        listContainer.appendChild(li);
        saveData();
        
        // Add event listeners
        addEventListenersToTask(li, undoneImg, crossImg, task);
    }
    inputBox.value = "";
}

// Add event listeners to task
function addEventListenersToTask(li, undoneImg, crossImg, task) {
    crossImg.addEventListener("click", () => {
        listContainer.removeChild(li);
        saveData();
    });

    undoneImg.addEventListener("click", () => {
        if (task === "pending") {
            undoneImg.src = "done.png";
            li.classList.add("done-text");
            task = "done";
        } else {
            undoneImg.src = "undone.png";
            li.classList.remove("done-text");
            task = "pending";
        }
        saveData();
    });
}

// Save the data
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Show the data
function showData() {
    listContainer.innerHTML = localStorage.getItem("data");
    if (listContainer.innerHTML !== "") {
        // Re-add event listeners for each task after loading data
        listContainer.querySelectorAll("li").forEach(li => {
            let undoneImg = li.querySelector("#mark-list");
            let crossImg = li.querySelector("#delet-list");
            let task = undoneImg.src.includes("done.png") ? "done" : "pending";
            
            addEventListenersToTask(li, undoneImg, crossImg, task);
        });
    }
}

// Clear saved data
function clearData() {
    localStorage.clear();
    listContainer.innerHTML = "";
}

// Call showData function to display tasks after refresh
showData();