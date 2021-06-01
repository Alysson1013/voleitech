const jwt = require('jwt-simple')

module.exports = async ({ req }) => {
    const auth = req.headers.authorization
    const token = auth && auth.substring(7)

    let user = null

    if (token) {
        try {
            let tokenContent = jwt.decode(token, process.env.APP_AUTH_SECRET)
            if (new Date(tokenContent.exp * 1000) > new Date()) {
                user = tokenContent
            }
        } catch (error) {

        }
    }

    const err = "Access Denied"

    return {
        user,
        userValidate() {
            if (!user) throw err
        },
        userValidateFilter(filter) {
            if (!user) throw err
            if (!filter) throw err

            const { id } = filter
            if (!id) throw err
            if (id && id !== user.id) throw err
        },
        userValidatePropriety(user_id){
            if (!user) throw err
            if (!user_id) throw err

            if (user_id != user.id) throw err
        }
    }
}