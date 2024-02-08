import { HttpContext } from '@adonisjs/core/build/standalone'
import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel'

export default class BaseController {
  protected Model: typeof BaseModel
  protected ValidateCreate;
  protected ValidateUpdate;

  constructor(model: typeof BaseModel) {
    this.Model = model
  }

  async setValidate({ ValidateCreate, ValidateUpdate }) {
    this.ValidateCreate = ValidateCreate;
    this.ValidateUpdate = ValidateUpdate;
}

  async index({ response }: HttpContext) {
    const data = await this.Model.all()
    return response.ok(data)
  }

  async show({ params, response }: HttpContext) {
    const data = await this.Model.find(params.id)

    if (!data) {
      return response.notFound({ message: `${this.Model.name} not found` })
    }

    return response.ok(data)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['rua','numero','bairro','complementar','latitude','longitude']);
    const payload = await this.ValidateCreate.validate(data);
    const instance = await this.Model.create(data)
    return response.created(instance)
  }

  async update({ params, request, response }: HttpContext) {
    const instance = await this.Model.find(params.id)

    if (!instance) {
      return response.notFound({ message: `${this.Model.name} not found` })
    }

    const data = request.only(this.Model.$columns.map(column => column.columnName))
    instance.merge(data)
    await instance.save()

    return response.ok(instance)
  }

  async destroy({ params, response }: HttpContext) {
    const instance = await this.Model.find(params.id)

    if (!instance) {
      return response.notFound({ message: `${this.Model.name} not found` })
    }

    await instance.delete()

    return response.noContent()
  }
}
