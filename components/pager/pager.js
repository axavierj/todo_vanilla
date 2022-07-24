import pagerTemplate from './pager.template.js'
import { createCustomEvent, eventDispatcher } from '../../helpers/helpers.js'

class Pager extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(pagerTemplate.content.cloneNode(true))
    this.pager = this.shadowRoot.querySelector('#pager')
    this.incrementBtn = this.shadowRoot.querySelector('#increment')
    this.decrementBtn = this.shadowRoot.querySelector('#decrement')
    this.beginBtn = this.shadowRoot.querySelector('#begin')
    this.endBtn = this.shadowRoot.querySelector('#end')
    this.currentPage = 1
  }

  pageChanger({ name, currentPage, dispatcher }) {
    const event = createCustomEvent(name, {
      currentPage,
    })
    eventDispatcher({ event, target: dispatcher })
  }

  connectedCallback() {
    const { incrementBtn, decrementBtn, beginBtn, endBtn } = this
    incrementBtn.addEventListener('click', (e) => {
      if (this.currentPage >= 1 && this.currentPage <= this.pages - 1) {
        this.currentPage++
        this.pageChanger({
          name: 'increment',
          currentPage: this.currentPage,
          dispatcher: this,
        })
      }
    })
    decrementBtn.addEventListener('click', (e) => {
      //decrement if currentPage is greater than 1

      if (this.currentPage <= this.pages && this.currentPage > 1) {
        this.currentPage--
        const event = createCustomEvent('decrement', {
          currentPage: this.currentPage,
        })
        eventDispatcher({ event, target: this })
      }
    })
    beginBtn.addEventListener('click', (e) => {
      this.currentPage = 1
      const event = createCustomEvent('begin', {
        currentPage: this.currentPage,
      })
      eventDispatcher({ event, target: this })
    })
    endBtn.addEventListener('click', (e) => {
      this.currentPage = this.pages
      const event = createCustomEvent('end', {
        currentPage: this.currentPage,
      })
      eventDispatcher({ event, target: this })
    })
  }

  static get observedAttributes() {
    return ['pages', 'current-page']
  }

  get pages() {
    return this.getAttribute('pages')
  }

  set pages(val) {
    this.setAttribute('pages', val)
  }

  set currentPage(val) {
    this.setAttribute('current-page', val)
  }

  get currentPage() {
    return this.getAttribute('current-page')
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    if (oldVal !== newVal) {
      this.render(attrName)
    }
  }

  render(name) {
    if (name === 'pages') {
      console.log(this.pages)
      this.pager.innerHTML = ''

      for (let index = 0; index < this.pages; index++) {
        this.pager.innerHTML += `
        <button class="pager__btn" data-page="${index}" id="page-${
          index + 1
        }">${index + 1}</button>
        `
      }

      const pageBtns = this.pager.querySelectorAll('.pager__btn')
      pageBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          this.currentPage = JSON.parse(e.target.dataset.page) + 1
          const event = createCustomEvent('page-change', {
            currentPage: this.currentPage,
          })
          eventDispatcher({ event, target: this })
        })
      })
    }
  }
}

window.customElements.define('pager-component', Pager)
