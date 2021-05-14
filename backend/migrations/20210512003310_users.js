
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('email').notNull().unique()
        table.string('password', 300).notNull()
        table.string('n_enrollment').notNull().unique()
        table.string('describe', 500).notNull()
        table.datetime('dt_birth').notNull()
        table.boolean('status').notNull().defaultTo(true)
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users')
};

