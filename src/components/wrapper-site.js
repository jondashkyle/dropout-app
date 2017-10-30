var html = require('choo/html')

module.exports = wrapper

function wrapper (view) {
  return function (state, emit) {
    // console.log(state.dropout.loaded)
    if (!state.dropout) return noArchive()
    // return noArchive()

    return html`
      <body class="bgc-white fc-black ff-sans lh1-5">
        ${view(state, emit)}
      </body>
    `
  }
}

function noArchive (state, emit) {
  return html`
    <body class="bgc-white fc-black ff-sans lh1-5 vhmn100 vw100 x xjc xac p2">
      <div class="markdown-body ff-heading copy fs1-5">
        <p>When interfaces are designed for capturing and exhausting your attention going offline is both an act of liberation and luxury. This is a tool of ethical technology enabling you to save pages for offline access and personal archival.</p>
        <p>The project requires Beaker Browser and it’s experimental <code>web api</code> to function. Good news; it’s really easy to start, and once downloaded you can begin browsing and publishing to the rest of the p2p web, too.</p>
        <ol>
          <li>Download and install <a href="http://beakerbrowser.com">Beaker Browser</a>.</li>
          <li>For now, navigate to <a href="dat://8b79c46e3484ae0f1fbe530711a762214543f2c37c4d323cb523450927b6f042/">the Dat archive url</a>.</li>
          <li>If you’d like to create your own, click Fork inside Beaker. Feel free to customize as the entire source is included.</li>
        </ul>
        <p>For more, visit the <a href="https://github.com/jondashkyle/dropout-beaker">repository</a> or <a href="https://jon-kyle.com/entries/2017-10-26-dropout/">the log entry</a>.
      </div>
    </body>
  `
}
