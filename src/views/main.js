var objectKeys = require('object-keys')
var dateFormat = require('dateformat')
var html = require('choo/html')
var raw = require('bel/raw')

var buttonSave = require('../components/button-save')
var panelSave = require('../components/panel-save')
var wrapper = require('../components/wrapper-site')

module.exports = wrapper(view)

function view (state, emit) {
  return html`
    <div>
      ${elSavePage()}
      ${pages({ pages: getPages() })}
      ${elPanelSave()}
    </div>
  `

  function getPages () {
    return objectKeys(state.dropout.library)
      .map(function (key) {
        var output = state.dropout.library[key]
        output.basename = output.basename || key
        output.dateformat = state.dropout.config.dateformat
        return output
      })
      .sort(function (a, b) {
        return b.date - a.date
      })
  }

  function elPanelSave () {
    return html`
      <div
        class="psf b0 l0 vh100 vw100 x xjc xac z2 panel-save curt bgc-greyish ${state.ui.add.active ? 'panel-save-active' : 'pen'}"
        onclick=${handleContainerClick}
      >
        ${panelSave({
          saving: state.dropout.saving,
          oninput: oninput,
          onsubmit: onsubmit,
          value: state.ui.add.value
        })}
      </div>
    `

    function oninput (data) {
      emit(state.events.UI_ADD, { value: data })
    }

    function onsubmit () {
      emit(state.events.DROPOUT_SAVEPAGE, {
        url: state.ui.add.value,
        callback: onsuccess,
        render: false
      })
    }

    function onsuccess () {
      emit(state.events.UI_ADD, { active: false, value: '' })
      setTimeout (function () {
        emit(state.events.UI_ADD, { value: '' })
      }, 500)
    }

    function handleContainerClick (event) {
      focusInput(event)
    }
  }

  function elSavePage() {
    return buttonSave({
      active: state.ui.add.active,
      onclick: function  (event) {
        emit(state.events.UI_ADD, { active: !state.ui.add.active })
        emit(state.events.RENDER)
        if (!state.ui.add.active) {
          setTimeout(function () {
            emit(state.events.UI_ADD, { value: '' })
          }, 500)
        } else {
          setTimeout(focusInput, 0)
        }
      }
    })
  }

  function focusInput (event) {
    if (!state.ui.add.active) return
    var el = document.querySelector('input')
    if (el) el.focus()
  }
}

function pages (props) {
  return html`
    <div id="pages-list" class="ff-heading pvw2">
      ${props.pages.map(page)}
    </div>
  `
}

function page (props) {
  var date = dateFormat(Date(props.date), props.dateformat)

  return html`
    <a
      href="/${props.basename}"
      class="x tdn fc-black pvw2 ${props.read ? 'op50 oph100' : ''}"
    >
      <div class="fsvw6 fw300 lh1-1 ti1">
        ${props.title}
      </div>
    </a>
  `
}