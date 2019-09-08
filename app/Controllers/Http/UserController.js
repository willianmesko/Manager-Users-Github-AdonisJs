"use strict"

const User = use("App/Models/User")

class UserController {

    async index ({response}) {

      const users = await User.query()
                .select('id','email','cpf')
                .with('lists', (builder) => {
                  builder.select('user_id','name')
                  })
                .fetch();

      if(!users)
         return response.status(400).send({error:'Nenhum usuário cadastrado'})

          response.send(users)
  }


  async store ({ request, response}) {


    const data = request.only(["email", "cpf", "password", "admin"]);

    const {id, email, cpf} = await User.create(data)

    response.send({
      message: "Usúario criado com sucesso",
      id,
      email,
      cpf
    });
  }


  async show ({ params, response }) {

    const user = await User.query()
                          .select('id','email','cpf','admin')
                          .where('id',params.id)
                          .with('lists', (builder) => {
                            builder.select('id','user_id','name')
                          })
                          .first();



    if(!user)
      return response.status(400).send({error:'Usuário não encontrado'});

    response.send(user);
  }
}



module.exports = UserController
