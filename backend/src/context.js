const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
    const auth = req.headers.authorization
    const token = auth && auth.substring(7)

    let usuario = null
    let admin = false

    if (token) {
        try {
            let conteudoToken = jwt.decode(token, process.env.APP_AUTH_SECRET)
            if (new Date(conteudoToken.exp * 1000) > new Date()) {
                usuario = conteudoToken
            }
        } catch (error) {

        }

        usuario.papel == 1 ? admin == true : admin == false

        const err = new Error('Acesso Negado')

        return {
            usuario,
            admin,
            validarUsuario() {
                if (!usuario) throw err
            },
            validarAdmin() {
                if (!admin) throw err
            },
            validarUsuarioFiltro() {
                if (admin) return

                if (!usuario) throw err
                if (!filtro) throw err

                const { id, email } = filtro
                if (!id && !email) throw err
                if (id && id !== usuario.id) throw err
                if (email && email !== usuario.email) throw err
            }
        }
    }
}