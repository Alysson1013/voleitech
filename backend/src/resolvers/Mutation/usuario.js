const db = require('../../../config/db')
const bcrypt = require('bcrypt-nodejs')
const { usuario: obterUsuario } = require('../Query/usuario')

const mutations = {
    registrarUsuario(_, { dados }) {
        return mutations.novoUsuario(_, {
            dados: {
                nome: dados.nome,
                email: dados.email,
                senha: dados.senha,
                dt_nasc: dados.dt_nasc,
                n_inscricao_t: dados.n_inscricao_t,
                descricao: dados.descricao,
                senha: dados.senha
            }
        })
    },
    async novoUsuario(_, { dados }, ctx) {
        try {
            const salt = bcrypt.genSaltSync()
            dados.senha = bcrypt.hashSync(dados.senha, salt)

            delete dados.papel

            const [id] = await db('usuario')
                .insert(dados)

            return db('usuario')
                .where({ id })
                .first()
        } catch (error) {
            throw new Error(e.sqlMessage)
        }
    },
    async excluirUsuario(_, args, ctx) {
        ctx && ctx.validarAdmin()

        try {
            const usuario = await obterUsuario(_, args)
            if (usuario) {
                const { id } = usuario
                await db('usuarios')
                    .where({ id }).delete()
            }
            return usuario
        } catch (e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }, ctx) {
        ctx && ctx.validarUsuarioFiltro(filtro)
        try {
            const usuario = await obterUsuario(_, { filtro })
            if (usuario) {
                if (dados.senha) {
                    const salt = bcrypt.genSaltSync()
                    dados.senha = bcrypt.hashSync(dados.senha, salt)
                }

                delete dados.perfis
                await db('usuarios')
                    .where({ id })
                    .update(dados)
            }
            return !usuario ? null : { ...usuario, ...dados }
        } catch (e) {
            throw new Error(e)
        }
    }
}