
exports.up = function(knex) {
    return knex.schema.createTable('training', table => {
        table.increments('id').primary()
        table.integer('training_type_id').notNull().unsigned()
        table.integer('team_id').notNull().unsigned()
        table.integer('scout_id').notNull().unsigned()
        table.string('name', 100).notNull()
        table.datetime('dt_training').notNull()
        table.time('hour_start').notNull()
        table.time('hour_finish')
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.foreign('training_type_id').references('training_type.id')
        table.foreign('team_id').references('teams.id')
        table.foreign('scout_id').references('scouts.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('training')
};

