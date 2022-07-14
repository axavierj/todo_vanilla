import todoService from '../../services/todo.service.mjs'
import authService from '../../services/login.service.mjs'
import { extractFormData } from '../../helpers/helpers.mjs'
const { getAllTodo, deleteTodo, updateTodo } = todoService
const { getSessionToken, getUsers } = authService
class TodoApp extends HTMLDivElement {
  constructor() {
    super()
    this.todoList = this.querySelector('todo-list')
    this.editTodoDialog = this.querySelector('#edit-todo')
    this.close = this.querySelector('#close-btn')
    this.editTodoForm = this.querySelector('#edit-todo-form')
    this.search = this.querySelector('todo-search')
    this.radioBtn = this.querySelectorAll('input[name="filter"]')
    this.todoData = []
    this.user
  }
  connectedCallback() {
    const token = getSessionToken()
    this.user = getUsers(
      { url: 'http://localhost:3000/api/auth/user' },
      token.accessToken
    )
    getAllTodo(
      { url: 'http://localhost:3000/api/todo' },
      token.accessToken
    ).then((data) => {
      this.todoData = [...data]
      this.todoList.todos = JSON.stringify(this.todoData)
      this.search.todos = JSON.stringify(this.todoData)
    })
    this.close.addEventListener('click', (e) => {
      this.editTodoDialog.close()
    })

    this.radioBtn.forEach((btn) => {
      btn.addEventListener('change', (e) => {
        const filtered = this.todoData.filter((todo) => {
          if (e.target.value === 'all') {
            return todo
          } else {
            return todo.status === e.target.value
          }
        })
        this.todoList.todos = JSON.stringify(filtered)
      })
    })

    this.addEventListener('search', (e) => {
      const search = e.detail
      //search the object using RegExp on the title description and person
      const searchRegex = new RegExp(search, 'i')
      const filteredTodos = this.todoData.filter((todo) => {
        return (
          searchRegex.test(todo.title) ||
          searchRegex.test(todo.description) ||
          searchRegex.test(todo.person)
        )
      })
      this.todoList.todos = JSON.stringify(filteredTodos)
    })

    this.editTodoForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const todo = extractFormData(this.editTodoForm)
      todo.id = this.editTodoForm.dataset.todo
      todo.user = this.user.id
      const obj = {
        url: `http://localhost:3000/api/todo/${this.editTodoForm.dataset.todo}`,
        data: todo,
      }
      const data = await updateTodo(obj, token.accessToken)
      if (data) {
        e.target.reset()
        this.editTodoDialog.close()
        const data = await getAllTodo(
          { url: 'http://localhost:3000/api/todo' },
          token.accessToken
        )
        this.todoData = [...data]
        this.todoList.todos = JSON.stringify(this.todoData)
        this.search.todos = JSON.stringify(this.todoData)
      }
    })
    this.addEventListener('todo-added', async (e) => {
      const data = await getAllTodo(
        { url: 'http://localhost:3000/api/todo' },
        token.accessToken
      )
      this.todoData = [...data]
      this.todoList.todos = JSON.stringify(this.todoData)
      this.search.todos = JSON.stringify(this.todoData)
    })
    this.addEventListener('action', async (e) => {
      switch (e.detail.action) {
        case 'delete':
          const confirmation = confirm(
            'Are you sure you want to delete this todo?'
          )

          if (confirmation) {
            await deleteTodo(
              {
                url: `http://localhost:3000/api/todo/${e.detail.todo}`,
              },
              token.accessToken
            )
            const data = await getAllTodo(
              {
                url: 'http://localhost:3000/api/todo',
              },
              token.accessToken
            )
            this.todoData = [...data]
            this.todoList.todos = JSON.stringify(this.todoData)
            this.search.todos = JSON.stringify(this.todoData)
          }

          break
        case 'edit':
          this.editTodoDialog.showModal()
          const singleTodo = await getAllTodo(
            {
              url: `http://localhost:3000/api/todo/${e.detail.todo}`,
            },
            token.accessToken
          )
          this.editTodoForm.dataset.todo = `${e.detail.todo}`
          this.editTodoForm.title.value = singleTodo.title
          this.editTodoForm.description.value = singleTodo.description
          this.editTodoForm.date.value = singleTodo.date
          this.editTodoForm.status.value = singleTodo.status
          break
        default:
          break
      }
    })
  }
  disconnectedCallback() {
    this.close.removeEventListener('click', (e) => {})
    this.editTodoForm.removeEventListener('submit', (e) => {})
    this.addEventListener('add-todo', (e) => {})
    this.addEventListener('action', (e) => {})
  }
}
window.customElements.define('todo-app', TodoApp, { extends: 'div' })
