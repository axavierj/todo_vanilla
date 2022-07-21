import loginTemplate from './login.template.js'
import { createTransmitObj, extractFormData } from '../../helpers/helpers.js'
import authService from '../../services/login.service.js'
import metaData from '../../meta/meta.js'

const { login } = authService

export class Login extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(loginTemplate.content.cloneNode(true))
    this.form = this.shadowRoot.querySelector('form')
    this.loginUrl = `${metaData.api}api/auth/login`
  }

  connectedCallback() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const credentials = createTransmitObj(
        extractFormData(e.target),
        this.loginUrl
      )
      const user = await login(credentials)
      if (user.accessToken) {
        sessionStorage.setItem('user', JSON.stringify(user))
        window.location.href = '/main'
      } else {
        alert(user.message)
      }
      this.form.reset()
    })
  }
}

window.customElements.define('login-component', Login)
