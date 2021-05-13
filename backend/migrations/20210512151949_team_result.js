
exports.up = function(knex) {
    return knex.schema.createTable('team_result', table => {
        table.increments('id').primary()
        table.integer('team_id').unsigned().notNull()
        table.datetime('dt_result').notNull()
        table.float('average_total')
        table.float('average_mistake')
        table.float('average_atack')
        table.float('average_atack_mistake')
        table.float('average_defense')
        table.float('average_defense_mistake')
        table.float('average_block')
        table.float('average_block_mistake')
        table.float('average_lifting')
        table.float('average_lifting_mistake')
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.foreign('team_id').references('teams.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('team_result')
};
