let button = document.querySelector("#btn-add")
let input = document.querySelector("#task")
let list = document.querySelector("#list")
let tasks = []

function createItem(text) { // Create the div element in DOM    
    let div = document.createElement("div")
    div.innerHTML = `
        <p></p>
        <div>
            <button class="btn-update">Update Task</button>
            <button class="btn-delete">Delete Task</button>
        </div>
    `
    div.classList.add("task");
    let p = div.querySelector("p")
    p.textContent = text

    return div
}

button.addEventListener("click", () => {
    if (!validateTask(input.value)) return 

    let div = createItem(input.value)

    list.appendChild(div)
    input.value = ""

    const p = div.querySelector("p")
    const updateAction = div.querySelector(".btn-update")
    const deleteAction = div.querySelector(".btn-delete")

    tasks.push(p.textContent)

    updateAction.addEventListener("click", () =>  {
        let newTask = prompt("Insert the new task: ")
        if (newTask == null) return
        
        newTask = newTask.trim()
        if (newTask === "") return

        if (tasks.includes(newTask) && newTask !== p.textContent) {
            alert("Essa tarefa já existe!")
            return
        }

        tasks = tasks.map(t => t === p.textContent ? newTask : t)
        p.textContent = newTask
        input.value = ""
    })

    deleteAction.addEventListener("click", () => {
        tasks = tasks.filter(t => t !== p.textContent)
        div.remove()
    })
})

function validateTask(text) {
    let task = text.trim()
    if (task == "") {
        alert("Tarefa vazia!")
        return false
    }

    if (tasks.includes(task)) {
        alert("Essa tarefa já existe!")
        return false
    }

    return true
}