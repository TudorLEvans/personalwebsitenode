const {
    login
} = require('./user_handler')

module.exports = (server) => {
    server.post('/login',login)
}