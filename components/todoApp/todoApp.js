import todoService from '../../services/todo.service.js'
import authService from '../../services/login.service.js'
import {
  extractFormData,
  createTransmitObj,
  todoPageTotal,
  splicedData,
} from '../../helpers/helpers.js'
import meta from '../../meta/meta.js'
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
    this.pager = this.querySelector('pager-component')
    this.limit = 5
    this.currentPage = 1
    this.pages
    this.todoData = []
    this.user
    this.url = meta.api
  }
  connectedCallback() {
    const token = getSessionToken()
    this.user = getUsers({ url: `${this.url}api/auth/user` }, token.accessToken)
    getAllTodo({ url: `${this.url}api/todo` }, token.accessToken).then(
      (data) => {
        this.pages = todoPageTotal({ data, limit: this.limit })
        this.pager.setAttribute('pages', this.pages)
        this.todoData = [...data]
        this.todoList.todos = JSON.stringify(
          splicedData({ data, limit: this.limit, page: this.currentPage })
        )
        this.search.todos = JSON.stringify(this.todoData)
      }
    )
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
      const data = await updateTodo(
        createTransmitObj(
          todo,
          `${this.url}api/todo/${this.editTodoForm.dataset.todo}`
        ),
        token.accessToken
      )
      if (data) {
        e.target.reset()
        this.editTodoDialog.close()
        const data = await getAllTodo(
          { url: `${this.url}api/todo` },
          token.accessToken
        )
        this.todoData = [...data]
        this.todoList.todos = JSON.stringify(
          splicedData({ data, limit: this.limit, page: this.currentPage })
        )
        this.search.todos = JSON.stringify(this.todoData)
      }
    })
    this.addEventListener('todo-added', async (e) => {
      const data = await getAllTodo(
        { url: `${this.url}api/todo` },
        token.accessToken
      )

      this.todoData = [...data]
      this.todoList.todos = JSON.stringify(
        splicedData({ data, limit: this.limit, page: this.currentPage })
      )
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
                url: `${this.url}api/todo/${e.detail.todo}`,
              },
              token.accessToken
            )
            const data = await getAllTodo(
              {
                url: `${this.url}api/todo`,
              },
              token.accessToken
            )
            this.todoData = [...data]
            this.todoList.todos = JSON.stringify(
              splicedData({ data, limit: this.limit, page: this.currentPage })
            )
            this.search.todos = JSON.stringify(this.todoData)
          }

          break
        case 'edit':
          this.editTodoDialog.showModal()
          const singleTodo = await getAllTodo(
            {
              url: `${this.url}api/todo/${e.detail.todo}`,
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
    this.addEventListener('page-change', (e) => {
      this.currentPage = JSON.parse(e.detail.currentPage)
      this.todoList.todos = JSON.stringify(
        splicedData({
          data: this.todoData,
          limit: this.limit,
          page: this.currentPage,
        })
      )
    })
    this.addEventListener('increment', (e) => {
      this.currentPage = JSON.parse(e.detail.currentPage)
      this.todoList.todos = JSON.stringify(
        splicedData({
          data: this.todoData,
          limit: this.limit,
          page: this.currentPage,
        })
      )
    })
    this.addEventListener('decrement', (e) => {
      this.currentPage = JSON.parse(e.detail.currentPage)
      this.todoList.todos = JSON.stringify(
        splicedData({
          data: this.todoData,
          limit: this.limit,
          page: this.currentPage,
        })
      )
    })
    this.addEventListener('begin', (e) => {
      this.currentPage = JSON.parse(e.detail.currentPage)
      this.todoList.todos = JSON.stringify(
        splicedData({
          data: this.todoData,
          limit: this.limit,
          page: this.currentPage,
        })
      )
    })
    this.addEventListener('end', (e) => {
      this.currentPage = JSON.parse(e.detail.currentPage)
      this.todoList.todos = JSON.stringify(
        splicedData({
          data: this.todoData,
          limit: this.limit,
          page: this.currentPage,
        })
      )
    })
  }
  disconnectedCallback() {
    this.close.removeEventListener('click', (e) => {})
    this.editTodoForm.removeEventListener('submit', (e) => {})
    this.removeEventListener('todo-added', (e) => {})
    this.removeEventListener('action', (e) => {})
    this.removeEventListener('page-change', (e) => {})
    this.removeEventListener('increment', (e) => {})
    this.removeEventListener('decrement', (e) => {})
    this.removeEventListener('begin', (e) => {})
    this.removeEventListener('end', (e) => {})
    this.removeEventListener('search', (e) => {})
  }
}
window.customElements.define('todo-app', TodoApp, { extends: 'div' })
