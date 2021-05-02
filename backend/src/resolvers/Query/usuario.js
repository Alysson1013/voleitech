const db = require('../../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { getUserLogged } = require('../UsuarioLogado')

module.exports = {
    async login(_, { dados }) {
        const usuario = await db('usuario')
            .where({ email: dados.email })
            .first()

        if (!usuario) throw new Error('Usuario/Senha Inválido')

        const equal = bcrypt.compareSync(dados.senha, usuario.senha)
        if (!equal) throw new Error('Usuario/Senha Inválido')

        return getUserLogged(usuario)
    },
    usuarios(_, args, ctx) {
        ctx && ctx.validarAdmin()
        return db('usuario')
    },
    usuario(_, { filtro }, ctx) {
        ctx && ctx.validarUsuarioFiltro()
        
        if (!filtro) return null
        const { id, email } = filtro
        if (id) {
            return db('usuario')
                .where({ id })
                .first()
        } else if (email) {
            return db('usuario')
                .where({ email })
                .first()
        } else {
            return null
        }
    }
}