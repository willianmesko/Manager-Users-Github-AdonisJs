'use strict'


const Model = use('Model')

class List extends Model {

  owner () {
    return this.belongsTo('App/Models/User')
  }

  devs () {
    return this.belongsToMany('App/Models/Developer');
}


}

module.exports = List
