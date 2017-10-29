var html = require('choo/html')
var assert = require('assert')
var css = require('sheetify')

var style = css`
  .button-animate {
    transition: transform 250ms cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: rotate(0deg);
  } 

  .button-animate.button-rotate {
    transform: rotate(45deg);
  }
`

module.exports = buttonSave

function buttonSave (props) {
  assert.equal(typeof props, 'object', 'arg1 props should be type object')
  assert.equal(typeof props.onclick, 'function', 'arg1.onclick props should be type function')

  return html`
    <div id="button-save" class="psf b0 r0 m1 z3 ${style}">
      <div
        class="usn fab bgc-black fc-white curp fw200 ff-mono"
        onclick=${props.onclick}
      >
        <div class="button-animate ${props.active ? 'button-rotate' : ''}">+</div>
      </div>
    </div>
  `
}