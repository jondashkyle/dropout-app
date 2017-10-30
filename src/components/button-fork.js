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
        <svg height="20" width="20" viewBox="0 0 23 23">
          <g transform="translate(-3.000000, -4.000000)" fill="#FFFFFF">
            <g transform="translate(-5.000000, -4.000000)">
              <polygon  transform="translate(19.924126, 19.216797) rotate(-45.000000) translate(-19.924126, -19.216797) " points="22.7734278 31.2606528 34.8172838 19.2167969 22.7734278 7.17294094 20.5707763 9.37559245 28.8963949 17.6607954 5.03096892 17.6607954 5.03096892 20.7727984 28.8963949 20.7727984 20.5707763 29.0580013">
            </g>
          </g>
        </svg>      
      </div>
    </div>
  `
}