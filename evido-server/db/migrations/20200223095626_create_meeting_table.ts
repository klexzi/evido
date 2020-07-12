import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('Meeting', table => {
    table
      .string('id')
      .primary()
      .notNullable();
    table.string('title').notNullable();
    table.dateTime('meetingTime').notNullable();
    table.boolean('hasEnded').defaultTo(false);
    table
      .integer('hostID')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('User')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamp('createdAt', { precision: 6 }).defaultTo(knex.fn.now());
    table.timestamp('updatedAt', { precision: 6 }).defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('Meeting');
}
