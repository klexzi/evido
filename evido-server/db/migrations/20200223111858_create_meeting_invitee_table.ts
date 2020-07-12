import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('MeetingInvitee', table => {
    table
      .string('meetingID')
      .notNullable()
      .references('id')
      .inTable('Meeting')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('inviteeID')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('Invitee')
      .onDelete('CASCADE')
      .onDelete('CASCADE');
    table.unique(['meetingID', 'inviteeID']);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('MeetingInvitee');
}
