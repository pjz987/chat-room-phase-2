function createUsernameHandler (el, body, state) {
  return function () {
    state.name = document.querySelector('#username_input').value
    body.removeChild(el)
    state.display_.style.display = 'block'
  }
}

module.exports = {
  createUsernameHandler
}
