const db = require('../../../config/db')

module.exports = {
    category(team) {
        return db
            .select(["name_category", "team_category.describe as describe"])
            .from("teams")
            .innerJoin("team_category", "teams.category_id", "team_category.id")
            .whereRaw(`teams.category_id = ${team.category_id}`)
            .first()
    }
}