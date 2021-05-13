
exports.up = function(knex) {
    return knex.schema.createTable('team_category', table => {
        table.increments('id').primary()
        table.string('name_category', 100).notNull().unique()
        table.string('describe', 500)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('team_category')
};
