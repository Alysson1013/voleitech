
exports.up = function(knex) {
    return knex.schema.createTable('teams', table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().notNull()
        table.integer('category_id').unsigned().notNull()
        table.enu('gender', ['male', 'female']).notNull()
        table.string('name').unique().notNull()
        table.float('average_result')
        table.float('average_age')
        table.float('average_height')
        table.float('average_weight')
        table.string('describe', 500)

        table.foreign('user_id').references('users.id')
        table.foreign('category_id').references('team_category.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('teams')
};
