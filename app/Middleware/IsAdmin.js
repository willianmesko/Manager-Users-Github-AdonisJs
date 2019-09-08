'use strict'
const Database = use('Database');

class IsAdmin {

  async handle ({ response, auth }, next) {
      const {id} = auth.user;
     const isAdmin = await Database.from('users').where('id', id).andWhere('admin', 1);

     if(isAdmin < 1) {
       return response.status(401).send({error:'Somente Administradores podem adicionar ou pesquisar por novos usuários.'});
     }

     await next()
  }
}

module.exports = IsAdmin
