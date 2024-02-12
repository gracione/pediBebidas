import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import Endereco from '#models/endereco'
import BaseController from './bases_controller.js'
import { ValidateCreate, ValidateAutenticacao } from '#validators/usuario'
import hash from '@adonisjs/core/services/hash'

export default class UsuariosController extends BaseController {
  constructor() {
    super(Usuario)
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.all()
      await ValidateCreate.validate(data)

      const { email } = request.only(['email'])
      let user = await Usuario.findBy('email', email)

      if (user) {
        return response.status(400).send({ error: 'Email já cadastrado' })
      }

      const usuarioData = request.only(['nome', 'telefone', 'email', 'password', 'data_nascimento'])
      usuarioData.password = await hash.make(usuarioData.password)
      const enderecoData = request.only([
        'rua',
        'numero',
        'bairro',
        'complementar',
        'latitude',
        'longitude',
      ])
      const endereco = await Endereco.create(enderecoData)
      usuarioData.id_endereco = endereco.id

      user = await Usuario.create(usuarioData)
      const token = await Usuario.accessTokens.create(user)

      return response.status(201).send(token)
    } catch (error) {
      return response.status(500).send({ error: 'Erro interno do servidor' })
    }
  }

  async autenticarUsuario({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await Usuario.findBy('email', email)
    if (!user) {
      response.abort('Invalid credentials')
    }

    const hashVerify = await hash.verify(user?.password, password)
    if (!hashVerify) {
      return response.status(400).send({ error: 'Senha incorreta' })
    }
    const token = await Usuario.accessTokens.create(user)
    return token
  }
}
