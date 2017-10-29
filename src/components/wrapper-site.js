var html = require('choo/html')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    return html`
      <body class="bgc-white fc-black ff-sans lh1-5">
        ${view(state, emit)}
      </body>
    `
  }
}
