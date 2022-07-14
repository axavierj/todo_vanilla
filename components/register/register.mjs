import registerTemplate from './register.template.mjs'
import authService from '../../services/login.service.mjs'
import { createTransmitObj, extractFormData } from '../../helpers/helpers.mjs'
import metaData from '../../meta/meta.mjs'

const { register } = authService

class Register extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(registerTemplate.content.cloneNode(true))
    this.form = this.shadowRoot.querySelector('form')
    this.url = `${metaData.api}api/auth/register`
  }
  connectedCallback() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const credentials = createTransmitObj(
        extractFormData(this.form),
        this.url
      )
      const response = await register(credentials)
      if (response.accessToken) {
        sessionStorage.setItem('user', JSON.stringify(response))
        window.location.href = '/main'
      } else {
        alert(response)
      }
      this.form.reset()
    })
  }

  disconnectedCallback() {
    this.form.removeEventListener('submit')
  }
}

window.customElements.define('register-form', Register)
