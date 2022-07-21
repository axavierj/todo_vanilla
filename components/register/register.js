import registerTemplate from './register.template.js'
import authService from '../../services/login.service.js'
import { createTransmitObj, extractFormData } from '../../helpers/helpers.js'
import metaData from '../../meta/meta.js'

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
    console.table(this.url)
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const credentials = createTransmitObj(
        extractFormData(this.form),
        this.url
      )
      const response = await register(credentials)
      console.log(response)
      if (response.accessToken) {
        sessionStorage.setItem('user', JSON.stringify(response))
        window.location.href = '/main'
      } else {
        alert(response.message)
      }
      this.form.reset()
    })
  }

  disconnectedCallback() {
    this.form.removeEventListener('submit')
  }
}

window.customElements.define('register-form', Register)
