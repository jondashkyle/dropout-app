var html = require('choo/html')
var raw = require('bel/raw')

var wrapper = require('../components/wrapper-site')
var NavPage = require('../components/nav-page')

var titlebar = new NavPage()

module.exports = wrapper(view)

function view (state, emit) {
  var page = state.dropout.library[state.params.page]
  if (!page) return notfound({ basename: state.params.page })

  // mark as read if not
  if (!page.read) {
    emit(state.events.DROPOUT_WRITEPAGE, {
      basename: state.params.page,
      read: true
    })
  }

  return html`
    <div id="page-container" class="pt4">
      ${titlebar.render({
        page: page,
        handleDelete: handleDelete
      })}
      <div id="page-content" class="markdown-body px1 py4">
        ${raw(page.content)}
      </div>
    </div>
  `

  function handleDelete (event) {
    emit(state.events.DROPOUT_DELETEPAGE, { basename: page.basename, redirect: '/' })
  }
}

function notfound (basename) {
  return html`
    <div class="vhmn100 c12 x xjc xac">
      ${basename} not found
    </div>
  `
}