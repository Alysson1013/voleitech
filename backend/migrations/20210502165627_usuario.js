
exports.up = function (knex) {
    return knex.schema.createTable('usuario', table => {
        table.increments('id').primary()
        table.string('name', 50).notNull()
        table.string('email', 80).notNull().unique()
        table.date('dt_birth').notNull()
        table.string('n_subscription_t').notNull().unique()
        table.string('description', 500)
        table.string('password', 500).notNull()
        table.timestamp('dt_creation').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('usuario')
};
