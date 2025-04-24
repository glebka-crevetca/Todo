const btnDone = document.querySelector('#btn-done');
const btnDelete = document.querySelector('#btn-delete');
let isBtnVisible = false;
let isBtnDelVisible = false;

btnDone.addEventListener('click', () => {
    isBtnVisible = !isBtnVisible;

    if (isBtnVisible) {
        btnDone.classList.add('active');
    } else {
        btnDone.classList.remove('active');
    }
})
btnDelete.addEventListener('click', () => {
    isBtnDelVisible = !isBtnDelVisible;

    if (isBtnDelVisible) {
        btnDelete.classList.add('active');
    } else {
        btnDelete.classList.remove('active');
    }
})



const form = document.querySelector('#form');
const taskInput = document.querySelector('#input');
const taskList = document.querySelector('#task-list');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const taskText = taskInput.value;

    const taskHtml = `
                <li class="list-group-item">
                    <span class="task-title">${taskText}</span>
                    <div class="group-item-button">
                        <button type="button" data-action="done" id="btn-done" class="btn-action done">
							<img src="icons/done.svg" alt="Done">
						</button>
						<button type="button" data-action="delete" id="btn-delete" class="btn-action delete">
							<img src="icons/delete.svg" alt="Done">
						</button>
                    </div>
                </li>`;  
    taskList.insertAdjacentHTML('beforeend', taskHtml);

    taskInput.value = '';
    
});