
exports.up = function(knex) {
    return knex.schema.createTable('training_type', table => {
        table.increments('id').primary()
        table.string('training_type_name').unique().notNull()
        table.string('describe', 500).notNull()
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('training_type')
};
