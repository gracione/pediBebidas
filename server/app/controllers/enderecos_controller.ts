import { HttpContext } from '@adonisjs/core/http'
import Endereco from '#models/endereco'
import BaseController from './bases_controllerOld.js'

export default class EnderecosController extends BaseController {
  constructor() {
    super(Endereco)
  }

  async updateAddressUser({ auth, request, response }: HttpContext) {
    try {
      const idEndereco = auth.user?.id_endereco
      const instance = await this.Model.find(idEndereco)
      if (!instance) {
        return response.notFound({ message: `${this.Model.name} not found` })
      }

      const data = request.all()
      instance.merge(data)
      await instance.save()
      return response.ok(instance)
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }

  async show({ auth, response }: HttpContext) {
    try {
      const idEndereco = auth.user?.id_endereco
      const data = await this.Model.find(idEndereco)

      if (!data) {
        return response.notFound({ message: `${this.Model.name} not found` })
      }

      return response.ok(data)
    } catch (error) {
      return response.internalServerError({ message: error.message })
    }
  }
}
