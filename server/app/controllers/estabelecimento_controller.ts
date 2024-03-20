import type { HttpContext } from '@adonisjs/core/http'
import Endereco from '#models/endereco'
import Usuario from '#models/usuario'
import Estabelecimento from '#models/estabelecimento'
import UserTypes from '../Enums/UserTypes.js'

export default class EstabelecimentoController {
  async store({ auth,request, response }: HttpContext) {
      try {
        const EstabelecimentoDate = request.all()
        const idUsuario = auth.user?.id

        const instance = await Usuario.find(idUsuario);
        if (instance) {
            instance.merge({ id_tipo_usuario: UserTypes.ADM_ESTABELECIMENTO });
            await instance.save();
            console.log("Tipo de usuário atualizado com sucesso para ADM_ESTABELECIMENTO");
        } else {
            console.error("Usuário não encontrado.");
        }
  
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
