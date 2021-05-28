
exports.up = function(knex) {
    return knex.schema.createTable('team_category', table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().notNull()
        table.string('name_category', 100).notNull()
        table.string('describe', 500)
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.foreign('user_id').references('users.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('team_category')
};
