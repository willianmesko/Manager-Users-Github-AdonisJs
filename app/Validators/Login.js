'use strict'

class Login {
  get rules () {
    return {
      email: 'required|email:users',
      password: 'required|min:6:users',

    }
  }

  get messages () {
    return {
      'email.required': 'Você deve preencher o e-mail',
      'email.email': 'Você deve usar um e-mail válido.',
      'password.required': 'Você deve preencher a senha',
      'password.min': 'A senha precisa ter no mínimo 6 dígitos',


    }
  }
}

module.exports = Login
