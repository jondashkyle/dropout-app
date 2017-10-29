var html = require('choo/html')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    if (!state.dropout) return noArchive()

    return html`
      <body class="bgc-white fc-black ff-sans lh1-5">
        ${view(state, emit)}
      </body>
    `
  }
}

function noArchive (state, emit) {
  return html`
    <body class="bgc-white fc-black ff-sans lh1-5 vhmn100 vw100 x xjc xac fs2">
      <div>Can not load very sorry</div>
    </body>
  `
}
