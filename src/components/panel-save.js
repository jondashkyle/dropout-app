var assert = require('assert')
var html = require('choo/html')

module.exports = panelSave

function panelSave (props) {
  assert.equal(typeof props, 'object', 'arg1 props must be type object')
  assert.equal(typeof props.value, 'string', 'arg1 props.value must be type string')
  assert.equal(typeof props.oninput, 'function', 'arg1 props.oninput must be type function')
  assert.equal(typeof props.onsubmit, 'function', 'arg1 props.onsubmit must be type function')

  var placeholder = props.placeholder || 'http://'

  return html`
    <form class="w100" onsubmit=${handleSubmit}>
      <input
        id="page-input"
        class="ff-sans fsvw6 ff-heading p0 m0 db w100 bgc-transparent fc-black tac"
        style="border: 0; outline: 0;"
        type="text"
        value="${props.value}"
        placeholder=${placeholder}
        oninput=${handleInput}
      />
      <div class="psa b0 l0 r0 x xjc p1 pen usn">
        <div
          class="pea curp c4 tac bgc-black fc-white button-wide fw500 ${!props.value || props.saving ? 'pen' : ''} ${props.value ? 'button-wide-active' : ''}"
          onclick=${handleSubmit}
        >${props.saving ? 'Saving...' : 'Save to Library'}</div>
      </div>
    </div>
  `

  function handleInput (event) {
    props.oninput(event.target.value)
  } 

  function handleSubmit (event) {
    props.onsubmit()
    event.preventDefault()
  }
}