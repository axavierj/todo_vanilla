class NavBtn extends HTMLButtonElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.addEventListener('click', () => {
      sessionStorage.removeItem('singleTodo')
      sessionStorage.setItem('singleTodo', this.dataset.todo)
      window.location.href = '/todo'
    })
  }
}
window.customElements.define('nav-btn', NavBtn, { extends: 'button' })
