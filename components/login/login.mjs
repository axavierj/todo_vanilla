import loginTemplate from './login.template.mjs'
import { createTransmitObj, extractFormData } from '../../helpers/helpers.mjs'
import authService from '../../services/login.service.mjs'
import metaData from '../../meta/meta.mjs'

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
        alert(user)
      }
      this.form.reset()
    })
  }
}

window.customElements.define('login-component', Login)
