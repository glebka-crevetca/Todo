const form = document.querySelector('#form');
const taskInput = document.querySelector('#input');
const taskList = document.querySelector('#task-list');
const emptyList = document.querySelector('#empty-list');
const linesContainer = document.querySelector('#empty-lines');

let tasks = [];

form.addEventListener('submit', addTask);
form.addEventListener('reset', deleteDoneTasks)

taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);


function addTask(event) {
    event.preventDefault();

    const tasksCounter = taskList.children.length;

    const taskText = '. ' + taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    };

    tasks.push(newTask)

    const cssClass = newTask.done ? "task-title task-title--done": "task-title";

    const taskHtml = `
                <li id="${newTask.id}" class="list-group-item">
                    <span class="${cssClass}"><p class='count'></p> ${newTask.text}</span>
                    <div class="group-item-button">
                        <button type="button" data-action="done" class="btn-action done">
							<img src="icons/done.svg" alt="Done">
						</button>
						<button type="button" data-action="delete" class="btn-action delete">
							<img src="icons/delete.svg" alt="Done">
						</button>
                    </div>
                </li>`;  
    taskList.insertAdjacentHTML('beforeend', taskHtml);

    taskInput.value = '';
    
    if (tasksCounter >= 1) {
        emptyList.classList.add('none');
    }

    if (tasksCounter <=6 && tasksCounter > 1) {
        linesContainer.children[tasksCounter - 2].classList.add('none');
    }

    counterTasks();
};

function deleteTask(event) {

    if (event.target.dataset.action !== 'delete') {
        return
    }

    const parentNode = event.target.closest('.list-group-item');

    const id = parentNode.id

    tasks = tasks.filter((task) => task.id != id)

    parentNode.remove();
        
    const tasksCounter = taskList.children.length;

    if (tasksCounter === 1) {
        emptyList.classList.remove('none');
    }

    if (tasksCounter <=6 && tasksCounter > 1) {
        linesContainer.children[tasksCounter - 2].classList.remove('none');
    }

    counterTasks();
}

function doneTask(event) {

    if (event.target.dataset.action !== 'done') {
        return
    }

    const btnDone = event.target.closest('.done');
    btnDone.classList.toggle('active');

    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

    counterTasks();
}

function deleteDoneTasks(event) {
    event.preventDefault();
    
    const tasksCounter = taskList.children.length;
    let currentTasks = tasksCounter;
    const tasks = taskList.querySelectorAll('li.list-group-item');

    Array.from(tasks).reverse().forEach(task => {

        const doneButton = task.querySelector('button[data-action="done"].active');

        if (doneButton) {
            task.remove();
            currentTasks-=1;
        }

        if (currentTasks === 1) {
            emptyList.classList.remove('none');
        }
    })

    const emptyLines = linesContainer.querySelectorAll('.empty-line');
    const emptyLinesNeeded = Math.max(0, 7 - currentTasks);

    emptyLines.forEach((item, index) => {
        if (index < emptyLinesNeeded) {
            item.classList.remove('none');
        } else {
            item.classList.add('none');
        }
    })

    if (taskList.children.length === 1) {
        emptyLines.classList.remove('none');
    } else {
        emptyLines.classList.add('none');
    }
    
    counterTasks();
}

function counterTasks() {

    const allTasks = taskList.querySelectorAll('li.list-group-item');

    Array.from(allTasks).forEach((item, index) => {

        const countTask = item.querySelector('p.count');
        countTask.textContent = (index + 1);
})
}