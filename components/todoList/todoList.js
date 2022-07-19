import todoListTemplate from './todoList.template.js'
import moment from 'https://cdn.skypack.dev/moment'

class TodoList extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(todoListTemplate.content.cloneNode(true))
    this.todoList = this.shadowRoot.querySelector('#todo_list')
  }

  connectedCallback() {}

  static get observedAttributes() {
    return ['todos']
  }

  get todos() {
    return this.getAttribute('todos')
  }
  set todos(value) {
    this.setAttribute('todos', value)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render(name)
    }
  }

  render(name) {
    switch (name) {
      case 'todos':
        this.todoList.innerHTML = ''
        const todos = JSON.parse(this.todos)
        todos.forEach((todo) => {
          this.todoList.innerHTML += `
          <details>
    <summary>
      <button is="nav-btn" data-todo=${todo.id}>${todo.title}</button>
      <span class="${todo?.status}">${todo?.status}</span>
    </summary>
    <p>${todo.description}</p>
    <div>due date: <br> &emsp; <time>${moment(todo.date).fromNow()}</time></div>
    <div>
      <button is="action-btn" data-action="edit" data-todo="${todo.id}">
        <svg xmlns="http://www.w3.org/2000/svg" 
          class="icon icon-tabler icon-tabler-edit" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          stroke-width="2" 
          stroke="currentColor" 
          fill="none" 
          stroke-linecap="round" 
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
          <path d="M16 5l3 3"></path>
        </svg>
      </button>
      <button is="action-btn" data-action="delete" data-todo="${todo.id}">
        <svg xmlns="http://www.w3.org/2000/svg" 
          class="icon icon-tabler icon-tabler-trash" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          stroke-width="2" 
          stroke="currentColor" 
          fill="none" 
          stroke-linecap="round" 
          stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="4" y1="7" x2="20" y2="7"></line>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
        </svg>
      </button>
    </div>
  </details>`
        })
        break
    }
  }
}
window.customElements.define('todo-list', TodoList)
