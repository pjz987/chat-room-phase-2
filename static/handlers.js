function createUsernameHandler (el, body, username) {
    return function (){
        console.log(username)
        username.name = document.querySelector('#username_input').value
        console.log(username)
        body.removeChild(el)
        username.display_.style.display = 'block'
    }
}

module.exports = {
    createUsernameHandler
}