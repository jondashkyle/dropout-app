var html = require('choo/html')
var assert = require('assert')

module.exports = buttonFork

function buttonFork (props) {
  assert.equal(typeof props, 'object', 'arg1 props should be type object')
  assert.equal(typeof props.onclick, 'function', 'arg1.onclick props should be type function')

  return html`
    <div id="button-fork" class="psf b0 r0 m1 z3">
      <div
        class="usn fab bgc-black fc-white curp fw200 ff-mono"
        onclick=${props.onclick}
      >
        <div style="transform: rotate(-45deg); margin: 0 0 0 0.2rem">→</div>
      </div>
    </div>
  `
}