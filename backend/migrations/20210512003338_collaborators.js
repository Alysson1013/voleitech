
exports.up = function(knex) {
    return knex.schema.createTable('collaborators', table => {
        table.increments('id').primary()
        table.integer('user_id').unsigned()
        table.string('phone_1', 12).notNull().unique()
        table.string('phone_2', 12).unique()
        table.string('phone_3', 12).unique()
        table.string('email_1', 30).notNull().unique()
        table.string('email_2', 30).unique()
        table.string('email_3', 30).unique()
        table.string('name', 150).notNull()
        table.datetime('dt_birth').notNull()
        table.enu('function', ['athlete', 'assistant', 'both'])
        table.string('n_enrollment_atl')
        table.string('n_enrollment_ast')
        table.string('positions', 150)
        table.integer('n_uniform')
        table.float('height')
        table.float('weight')
        table.float('width')
        table.enu('gender', ['male', 'female'])
        table.float('bmi')
        table.float('jump_distance')
        table.float('jump_height')
        table.string('describe', 500)
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.foreign('user_id').references('users.id')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('collaborators')
};
