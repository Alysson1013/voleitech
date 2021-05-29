
exports.up = function (knex) {
    return knex.schema.createTable('athletes_training_results', table => {
        table.increments('id').primary()
        table.integer('collaborator_athlete_id').unsigned()
        table.integer('training_id').unsigned()
        table.integer('result_id').unsigned()
        table.boolean('status').defaultTo(true)

        table.foreign('collaborator_athlete_id').references('collaborators.id')
        table.foreign('training_id').references('training.id')
        table.foreign('result_id').references('results.id')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('athletes_training_results')
};

