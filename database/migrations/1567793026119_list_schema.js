'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Lists extends Schema {
  up () {
    this.create('lists', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade');
      table.timestamps()
    })
  }

  down () {
    this.drop('lists')
  }
}

module.exports = Lists
