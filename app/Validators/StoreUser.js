'use strict'

class StoreUser {
  get rules () {
    return {
      email: 'required|email|unique:users',
      password: 'required|min:6:users',
      cpf: 'required|number|min:11|max:11|unique:users'
    }
  }

  get messages () {
    return {
      'email.required': 'Você deve preencher o e-mail',
      'email.email': 'Você deve usar um e-mail válido.',
      'email.unique': 'Este e-mail já está cadastrado.',
      'password.required': 'Você deve preencher a senha',
      'password.min': 'A senha precisa ter no mínimo 6 dígitos',
      'cpf.required':'Você deve preencher o cpf',
      'cpf.unique': 'Cpf já cadastrado.',
      'cpf.min': 'CPF inválido',
      'cpf.max': 'CPF inválido',
      'cpf.number': 'Somente números são aceitos',
    }
  }
}

module.exports = StoreUser
