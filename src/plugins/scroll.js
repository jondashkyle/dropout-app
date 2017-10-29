module.exports = expose

function expose () {
  return function scroll (state, emitter, app) {
    emitter.on(state.events.NAVIGATE, navigate)

    function navigate () {
      window.scrollTo(0, 0)
    }
  }
}