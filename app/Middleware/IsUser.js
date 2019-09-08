'use strict'
const Database = use('Database');

class IsUser {

  async handle ({ response, auth}, next) {
    const {id} = auth.user;
    const isAdmin = await Database.from('users').where('id', id).andWhere('admin', 1);

    if(isAdmin.length >= 1) {
      return response.status(401).send({error:'Administradores não podem gerenciar listas'});
    }

    await next()
  }
}

module.exports = IsUser
