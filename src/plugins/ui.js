var xtend = require('xtend')

module.exports = expose

function expose () {
  return function plugin (state, emitter) {
    state.ui = {
      add: {
        active: false,
        value: ''
      }
    }

    state.events.UI = 'ui'
    state.events.UI_ADD = 'ui-add'

    emitter.on(state.events.UI, ui)
    emitter.on(state.events.UI_ADD, add)

    function ui (data) {
      
    }

    function add (data) {
      if (!data) return
      state.ui.add = xtend(state.ui.add, data)
      if (data.render !== false) emitter.emit(state.events.RENDER)
    }
  }
}
