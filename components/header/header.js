import metaData from '../../meta/meta.js'
import authService from '../../services/login.service.js'

const { getSessionToken, guardRoute, logOut } = authService
class Header extends HTMLDivElement {
  constructor() {
    super()
    this.logOutBtn = this.querySelector('button')
  }

  connectedCallback() {
    console.log('connected')
    const user = getSessionToken()
    guardRoute(user, metaData.api + 'api/guard', '/login')
    this.logOutBtn.addEventListener('click', () => {
      logOut()
    })
  }

  disconnectedCallback() {
    this.logOutBtn.removeEventListener('click', () => {})
  }
}

window.customElements.define('header-component', Header, { extends: 'div' })
