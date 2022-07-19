import addTemplate from './add.template.js'
import todoService from '../../services/todo.service.js'
import authService from '../../services/login.service.js'
import { extractFormData, createCustomEvent } from '../../helpers/helpers.js'
import metaData from '../../meta/meta.js'

const { createTodo } = todoService
const { getSessionToken, getUsers } = authService

class AddTodo extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(addTemplate.content.cloneNode(true))
    this.form = this.shadowRoot.querySelector('form')
    this.addBtn = this.shadowRoot.querySelector('#add_btn')
    this.dialog = this.shadowRoot.querySelector('dialog')
    this.close = this.shadowRoot.querySelector('#close_btn')
    this.url = `${metaData.api}api/todo`
  }
  connectedCallback() {
    const { addBtn, close } = this
    addBtn.addEventListener('click', (e) => {
      e.preventDefault()
      this.dialog.showModal()
    })
    close.addEventListener('click', (e) => {
      e.preventDefault()
      this.dialog.close()
    })

    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const todoData = extractFormData(this.form)
      const token = getSessionToken()
      todoData.status = 'pending'
      const user = await getUsers(
        { url: `${metaData.api}api/auth/user` },
        token.accessToken
      )
      todoData.userId = user.id
      const todo = await createTodo(
        { url: this.url, data: todoData },
        token.accessToken
      )
      if (todo.id) {
        const event = createCustomEvent('todo-added', {
          detail: todo,
          bubbles: true,
          composed: true,
        })
        this.dispatchEvent(event)
        this.form.reset()
        this.dialog.close()
      } else {
        alert(todo)
      }
    })
  }
  async submit() {
    const formData = extractFormData(this.form)

    const todo = {
      url: this.url,
      data: formData,
    }
    const data = await createTodo(todo)
    return data
  }
}

window.customElements.define('add-todo', AddTodo)
