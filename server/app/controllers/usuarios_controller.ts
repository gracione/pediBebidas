import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import Endereco from '#models/endereco';
import BaseController from './bases_controller.js'
import { ValidateCreate, ValidateAutenticacao } from '#validators/usuario'
import hash from '@adonisjs/core/services/hash'

export default class UsuariosController extends BaseController {
  constructor() {
    super(Usuario)

  }

  async store({ request, response }: HttpContext) {
    const data = request.all()
    await ValidateCreate.validate(data)
    const { email } = request.only(['email', 'password'])
    const user = await Usuario.findBy('email', email)
    
    if (user) {
        response.abort('Email já cadastrado')
    }

    const { id: id_endereco } = await Endereco.create(request.only(['rua','numero','bairro','complementar','latitude','longitude']));

    data.id_endereco = id_endereco
    const instance = await Usuario.create(request.only(['nome','telefone','email','password','data_nascimento','id_endereco']))
    const token = await Usuario.accessTokens.create(instance)
    return response.created(token)
  }

  async autenticarUsuario({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await Usuario.findBy('email', email)
    if (!user) {
      response.abort('Invalid credentials')
    }

    await hash.verify(user.password, password)
    const token = await Usuario.accessTokens.create(user)
    return token
  }
}
