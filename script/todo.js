const form = document.querySelector('#form');
const taskInput = document.querySelector('#input');
const taskList = document.querySelector('#task-list');
const emptyList = document.querySelector('#empty-list');
const linesContainer = document.querySelector('#empty-lines');


form.addEventListener('submit', addTask);
form.addEventListener('reset', deleteDoneTasks)

taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);

function addTask(event) {
    event.preventDefault();

    const tasksCounter = taskList.children.length;
    const taskText = tasksCounter + '. ' + taskInput.value;

    const taskHtml = `
                <li class="list-group-item">
                    <span class="task-title">${taskText}</span>
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
};

function deleteTask(event) {

    if (event.target.dataset.action !== 'delete') {
        return
    }

    const parentNode = event.target.closest('.list-group-item');
    parentNode.remove();
        
    const tasksCounter = taskList.children.length;

    if (tasksCounter === 1) {
        emptyList.classList.remove('none');
    }

    if (tasksCounter <=6 && tasksCounter > 1) {
        linesContainer.children[tasksCounter - 2].classList.remove('none');
    }
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
}

function deleteDoneTasks(event) {
    event.preventDefault();
    
    const tasksCounter = taskList.children.length;
    let doneTasks = tasksCounter;
    const tasks = taskList.querySelectorAll('li.list-group-item');

    Array.from(tasks).reverse().forEach(task => {

        const doneButton = task.querySelector('button[data-action="done"].active');

        if (doneButton) {
            task.remove();
        }

        doneTasks-=1;
    })

    if (doneTasks > 5) {
        return
    }

    for (var i = 0; i <= (5 - doneTasks); i++) {
        linesContainer.children[i].classList.remove('none');
    }

    if (doneTasks === 1) {
        emptyList.classList.remove('none');
    }
    console.log(doneTasks);
}