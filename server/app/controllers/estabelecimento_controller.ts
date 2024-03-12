import type { HttpContext } from '@adonisjs/core/http'
import Endereco from '#models/endereco'
import Estabelecimento from '#models/estabelecimento'
// import { ValidateCreate } from '#validators/estabelecimento'

export default class EstabelecimentoController {

  async store({ auth,request, response }: HttpContext) {
      try {
          const EstabelecimentoDate = request.all()
        //   await ValidateCreate.validate(EstabelecimentoDate)
        const idUsuario = auth.user?.id
        
        const enderecoData = request.only([
            'rua',
            'numero',
            'bairro',
            'complementar',
            'latitude',
            'longitude',
        ])
        const endereco = await Endereco.create(enderecoData)
        
        await Estabelecimento.create({
            id_endereco: endereco.id,
            id_usuario: idUsuario,
            nome: EstabelecimentoDate.nome
        });
            
      return response.status(201).send('Estabelecimento cadastrado')
    } catch (error) {
        console.log(error)
      return response.status(500).send({ error: 'Erro interno do servidor' })
    }
  }

  async show({ auth, params, response }: HttpContext) {
    const idUsuario = auth.user?.id
  
    const estabelecimento = await Estabelecimento.query()
    .where('id_usuario', idUsuario);
  
    if (!estabelecimento) {
      return response.notFound({ message: `Estabelecimento not found for user with ID ${idUsuario}` })
    }
  
    return response.ok(estabelecimento)
  }

  async index({ response }: HttpContext) {
    const data = await Estabelecimento.all()
    return response.ok(data)
  }

}
