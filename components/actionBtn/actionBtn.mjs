import { createCustomEvent } from '../../helpers/helpers.mjs'

class ActionBtn extends HTMLButtonElement {
  constructor() {
    super()
  }
  connectedCallback() {
    const action = this.dataset.action
    const todo = this.dataset.todo
    this.addEventListener('click', (e) => {
      const actionEvent = createCustomEvent('action', { action, todo })
      this.dispatchEvent(actionEvent)
    })
  }
  disconnectedCallback() {
    this.removeEventListener('click', (e) => {})
  }
}
window.customElements.define('action-btn', ActionBtn, { extends: 'button' })
