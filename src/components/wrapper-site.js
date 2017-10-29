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
    <body class="bgc-white fc-black ff-sans lh1-25 vhmn100 vw100 x xjc xac p2">
      <div class="markdown-body">
        <p>When interfaces are designed for capturing and exhausting your attention going offline is both an act of liberation and luxury. This is a tool of ethical technology enabling you to save pages for offline access and personal archival.</p>
        <p>The project requires Beaker Browser and it’s experimental <code>web api</code> to function. Good news; it’s really easy to start, and once downloaded you can begin browsing and publishing to the rest of the p2p web, too.</p>
        <ol>
          <li>Download and install <a href="http://beakerbrowser.com">Beaker Browser</a>.</li>
          <li>Navigate to <a href="dat://dropout.jon-kyle.com">dat://dropout.jon-kyle.com</a>, or click “p2p verison available” in Beaker.</li>
        </ul>
        <p>For more information about this project, visit <a href="https://jon-kyle.com/entries/2017-10-26-dropout/">my log</a>.
      </div>
    </body>
  `
}
