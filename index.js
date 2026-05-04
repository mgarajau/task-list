let tasks = [
];

const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

const renderTasks = (task) => {
    const checkbox = getCheckboxInput(task);
    const list = document.getElementById("task-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = "X";
   button.addEventListener("click", () => {
    tasks = tasks.filter((item) => item.id !== task.id);

    saveTasksToLocalStorage();

    listItem.remove();
});
    listItem.id = task.id;
    listItem.appendChild(checkbox);
    listItem.appendChild(button);
    list.appendChild(listItem);
};

const addTaskButton = document.getElementById("addTaskButton");

addTaskButton.addEventListener("click", () => {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();
    console.log(taskInput);
    console.log(taskText);
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false   
        };
        tasks.push(newTask);
        saveTasksToLocalStorage();
        renderTasks(newTask);
        taskInput.value = "";
    }
}); 

const getCheckboxInput = ({ id, text, completed }) => {
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    const wrapper = document.createElement("div");
    const checkboxId = `checkbox-${id}`;
    

    checkbox.type = "checkbox";
    checkbox.id = checkboxId;
    checkbox.checked = completed;
    

    label.htmlFor = checkboxId;
    label.textContent = text;

    wrapper.className = "checkbox-label-container";

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    return wrapper;
}



window.onload = function() {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    tasks.forEach((task) => {
        renderTasks(task);
    });
};