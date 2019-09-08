'use strict'
const axios = use('axios');
const Dev = use('App/Models/Developer');




class DeveloperController {

  async index ({ response }) {
    const devs = await Dev.query()
        .select('id','login','name','bio','location','html_url')
        .with('lists',(builder) => {
              builder.select('id','name')
           })
        .with('tags', (builder) => {
          builder.select('id','name')
        })
        .fetch();

    if(devs.length < 1)
        return response.status(400).send({error: 'Nenhum usuário cadastrado'});

    return response.send({devs});

  }


  async store ({ auth, request, response }) {
    const { username } = request.body;
    const { id } = auth.user;

      try {

        const res = await axios.get(`https://api.github.com/users/${username}`);

        const {login, name, bio, location, html_url} = res.data;

        const userExists = await Dev.findBy('login',username);

        if(userExists)
            return response.status(400).send({error: 'Usuário já cadastrado'});

        const user =  await Dev.create({login, name, bio, location, html_url, admin_id: id});

        return response.send({ user });

      } catch (error) {
          return response.status(400).send({error:"Usúario não encontrado no Github"})
      }

  }


  async show ({ params, response }) {
    const {id : username} = params;
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);

      const {login, name, bio, location, html_url} = res.data;

        return response.send({
        login,
        name,
        bio,
        location,
        html_url
        });

    } catch (error) {
        return response.status(400).send({error:'Usuário não encontrado'});
    }
}

}

module.exports = DeveloperController
