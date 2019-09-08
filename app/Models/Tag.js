'use strict'
const Model = use('Model');

class Tag extends Model {
  devs () {
    return this.belongsToMany('App/Models/Developer')
  }
}

module.exports = Tag
