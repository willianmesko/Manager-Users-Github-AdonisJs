'use strict'

const Route = use('Route')

Route.post('sessions', 'SessionController.create')
  .validator('Login');

Route.resource('users', 'UserController')
.validator(new Map([
  [['users.store'], ['StoreUser']]
]))



  //Somente administradores podem adicionar e pesquisar os devs do github
 Route.resource('devs', 'DeveloperController')
  .apiOnly()
  .middleware(new Map([
   [ ['devs.show','devs.store'], ['auth','admin'] ],

  ]));



  //Somente usuarios comuns podem gerenciar listas
 Route.resource('lists', 'ListController')
  .apiOnly()
  .middleware(['auth','user']);

  Route.post('list/:id/add', 'DeveloperListController.store')
  .middleware(['auth','user']);

  Route.delete('list/:id/delete/:dev_id', 'DeveloperListController.destroy')
  .middleware(['auth','user']);


