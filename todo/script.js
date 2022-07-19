import { extractFormData } from '../helpers/helpers.js'
import todoService from '../services/todo.service.js'
import authService from '../services/login.service.js'
import moment from 'https://cdn.skypack.dev/moment'
import metaData from '../meta/meta.js'

const token = authService.getSessionToken()
await authService.guardRoute(token, metaData.api + 'api/guard', '/login')

const close = document.querySelector('#close-btn')
const editTodoDialog = document.querySelector('#edit-todo')
const editTodoForm = document.querySelector('#edit-todo-form')
const todoID = sessionStorage.getItem('singleTodo')
const container = document.querySelector('#single-todo-container')
const back = document.querySelector('#back')

const { getAllTodo, updateTodo, deleteTodo } = todoService

history.replaceState(null, null, `/todo/${todoID}`)

const singleTodo = await getAllTodo(
  {
    url: `${metaData.api}api/todo/${todoID}`,
  },
  token.accessToken
)

if (singleTodo) {
  container.children[0].classList.remove('loading')
  container.children[1].classList.remove('loading')
  container.children[2].classList.remove('loading')
  container.children[3].classList.remove('loading')
}

container.children[0].innerHTML = singleTodo?.title
container.children[1].innerHTML = `due ${moment(singleTodo?.date).fromNow()}`
container.children[2].innerHTML = `Desctiption: <br> &emsp; ${singleTodo?.description}`
container.children[3].children[0].dataset.todo = todoID
container.children[3].children[1].dataset.todo = todoID

back.addEventListener('click', () => {
  history.back()
})

document.addEventListener('action', async (e) => {
  switch (e.detail.action) {
    case 'delete':
      const confirmation = confirm('Are you sure you want to delete this todo?')
      if (confirmation) {
        await deleteTodo(
          { url: `${metaData.api}api/todo/${todoID}` },
          token.accessToken
        )
        window.location.href = '/main'
      }

      break
    case 'edit':
      editTodoDialog.showModal()
      editTodoForm.dataset.todo = `${e.detail.todo}`
      editTodoForm.title.value = singleTodo.title
      editTodoForm.description.value = singleTodo.description
      editTodoForm.date.value = singleTodo.date
      editTodoForm.status.value = singleTodo.status
      break
    default:
      break
  }
})
close.addEventListener('click', () => {
  editTodoDialog.close()
})

editTodoForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const todo = extractFormData(editTodoForm)
  todo.id = todoID
  const obj = {
    url: `${metaData.api}api/todo/${todo.id}`,
    data: todo,
  }
  // debugger
  const res = await updateTodo(obj, token.accessToken)
  if (res) {
    window.location.href = '/main'
  }
  if (!res) {
    alert('Something went wrong')
    console.log(res)
  }
})
