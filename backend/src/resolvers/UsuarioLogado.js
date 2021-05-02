const jwt = require('jwt-simple')

module.exports = {
    async getUserLogged(usuario){
        const now = Math.floor(Date.now() / 1000)

        const userInfo = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            papel: usuario.papel,
            iat: now,
            exp: now + (3 * 24 * 60 * 60)
        }

        const authSecret = process.env.APP_AUTH_SECRET

        return {
            ...userInfo,
            token: jwt.encode(userInfo, authSecret)
        }
    }
}