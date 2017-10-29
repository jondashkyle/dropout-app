var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var assert = require('assert')
var css = require('sheetify')
var raw = require('bel/raw')
var raf = require('raf')

var style = css`
  :host {
    transform: translate3d(0, 0, 0);
    transition: transform 250ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  :host.nav-page-hide {
    transform: translate3d(0, -100%, 0);
  }
`

module.exports = class NavPage extends Nanocomponent {
  constructor () {
    super()

    this.state = {
      scrollY: 0,
      active: false,
      basename: ''
    }

    this.frame
    this.handleScroll = this.handleScroll.bind(this)
  }

  load () {
    var self = this
    setTimeout(function () {
      self.frame = raf(self.handleScroll)
      self.state.active = true
      self.rerender()
    }, 100)
  }

  unload () {
    raf.cancel(this.frame)
    this.state.active = false
    this.state.scrollY = 0
  }

  handleScroll () {
    var scrollY = window.scrollY
    if (scrollY === this.state.scrollY) {
      this.frame = raf(this.handleScroll)
      return 
    } else {
      if (scrollY > this.state.scrollY && scrollY > 100) {
        this.hide()
      } else {
        this.show()
      }
      this.state.scrollY = scrollY
      this.frame = raf(this.handleScroll)
    }
  }

  show () {
    if (!this.state.active) {
      this.state.active = true
      this.rerender()
    }
  }

  hide () {
    if (this.state.active) {
      this.state.active = false
      this.rerender()
    }
  }

  createElement (props) {
    assert(typeof props, 'object', 'arg1 props must be type object') 
    assert(typeof props.page, 'object', 'arg1 props.page must be type object') 
    assert(typeof props.handleDelete, 'fucntion', 'arg1 props.handleDelete must be type function') 

    return html`
      <div class="psf t0 l0 r0 x p0-5 bgc-black fc-white fw500 ${style} ${this.state.active ? '' : 'nav-page-hide'}"">
        <div class="psa t0 l0 p0-5">
          <a href="/" class="op50 oph100 tdn fc-white db p0-5 curp">${raw('&larr;')} Library</a>
        </div>
        <div class="p0-5 c8 co2 tac toe">${props.page.title}</div>
        <div class="psa t0 r0 p0-5 x tac">
          ${props.page.source ? source() : ''}
          <div class="p0-5 xx op50 oph100 curp" onclick=${props.handleDelete}>Delete</div>
        </div>
      </div>
    `

    function source () {
      return html`
        <a class="tdn fc-white db p0-5 xx op50 oph100 wsnw" href="${props.page.source}">
          Source<div class="dib" style="transform: rotate(-45deg)">${raw('&rarr;')}</div>
        </a>
      `
    }
  }

  update (props) {
    console.log(props)
  }
}