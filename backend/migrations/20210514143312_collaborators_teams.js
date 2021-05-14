
exports.up = function (knex) {
    return knex.schema.createTable('collaborators_teams', table => {
        table.increments('id').primary()
        table.integer('collaborator_id').unsigned().notNull()
        table.integer('team_id').unsigned().notNull()
        table.enu('function', ['athlete', 'assistant', 'both'])
        table.boolean('status').defaultTo(true)

        table.foreign('team_id').references('teams.id')
        table.foreign('collaborator_id').references('collaborators.id')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('collaborators_teams')
};
