const taskInput = document.querySelector('.todo_input')
const addButton = document.querySelector('.todo_button')
const ulTodoList = document.querySelector('.todo_list')
const selectFilter = document.querySelector('.filter_todo')

// Create and Add Taks
const addTaskToList = () => addElementsToList()

const createToDoElements = () => {
  const divElement = document.createElement('div')
  const liElement = document.createElement('li')
  const deleteButton = document.createElement('button')
  const completeButton = document.createElement('button')

  const elements = { divElement, liElement, deleteButton, completeButton }
  return elements
}

const setElementsProperties = ({ divElement, liElement, deleteButton, completeButton }) => {
  divElement.classList.add('todo')
  divElement.classList.add('incompletedItem')

  liElement.innerText = taskInput.value

  deleteButton.innerText = 'x'
  deleteButton.classList.add('delete_btn')

  completeButton.innerText = '✓'
  completeButton.classList.add('complete_btn')
}

const isInputBlank = input => input.value === ""
const clearInput = input => input.value = ""

const addElementsToList = () => {
  if (isInputBlank(taskInput)) return alert('Digite uma tarefa')

  const elements = createToDoElements()
  setElementsProperties(elements)
  setButtonsEvent(elements)

  const { divElement, liElement, deleteButton, completeButton } = elements

  liElement.appendChild(completeButton)
  liElement.appendChild(deleteButton)
  divElement.appendChild(liElement)

  ulTodoList.prepend(divElement)

  clearInput(taskInput)
  taskInput.focus()
}

// Filter
const setDisplayType = (item, type) => item.style.display = type

const clearFilter = ulElement => ulElement.querySelectorAll('.todo')
  .forEach(item => setDisplayType(item, 'none'))

const filter = event => {
  clearFilter(ulTodoList)

  const selectedIndex = event.target.selectedIndex
  const arrayClassNames = ['.todo', '.todo.completedItem', '.todo.incompletedItem']

  const filterList = arrayClassNames => ulTodoList.querySelectorAll(arrayClassNames[selectedIndex])
    .forEach(item => setDisplayType(item, 'flex'))

  filterList(arrayClassNames)
}

const divToDo = event => event.target.closest('.todo')
const classNames = ['completedItem', 'incompletedItem']

// Buttons functions
const removeTaskFromList = event => divToDo(event).remove()
const checkTaskAsComplete = event => classNames.forEach(className => divToDo(event)
  .classList.toggle(className))

// Event Listners for the buttons of the created tasks
const setButtonsEvent = ({ deleteButton, completeButton }) => {
  deleteButton.addEventListener('click', removeTaskFromList)
  completeButton.addEventListener('click', checkTaskAsComplete)
}

selectFilter.addEventListener('change', filter)
addButton.addEventListener('click', addTaskToList)