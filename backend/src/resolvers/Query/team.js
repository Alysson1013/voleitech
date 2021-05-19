const db = require('../../../config/db')

module.exports = {
    async teams(_, args){
        return db
            .select(["teams.id as id", "teams.name as name","team_category.name_category as category", "average_result", "average_age", "average_height", "average_weight", "teams.describe as describe", "user_id", "gender"])
            .table("teams")
            .innerJoin("team_category", "teams.category_id", "team_category.id")
    }
}