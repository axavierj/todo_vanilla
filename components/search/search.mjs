import { createCustomEvent } from '../../helpers/helpers.mjs'
import searchTemplate from './search.template.mjs'

class Search extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(searchTemplate.content.cloneNode(true))
    this.search = this.shadowRoot.querySelector('form')
    this.searchList = this.shadowRoot.querySelector('#search-list')
  }

  connectedCallback() {
    this.search.addEventListener('submit', (event) => {
      event.preventDefault()
      const search = new FormData(this.search)
      this.dispatchEvent(createCustomEvent('search', search.get('search')))
    })
  }

  static get observedAttributes() {
    return ['todos']
  }

  get todos() {
    return this.getAttribute('todos')
  }
  set todos(value) {
    this.setAttribute('todos', value)
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.render(attrName)
    }
  }

  render(attrName) {
    switch (attrName) {
      case 'todos':
        this.searchList.innerHTML = ''
        const todos = JSON.parse(this.todos)
        this.searchList.innerHTML += todos.map((todo) => {
          return `
            <option value="${todo.title}">${todo.description}</option>
          `
        })
        break
    }
  }

  disconnectedCallback() {
    this.removeEventListener('search', (event) => {})
  }
}
window.customElements.define('todo-search', Search)
