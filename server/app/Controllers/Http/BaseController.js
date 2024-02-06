'use strict';

class BaseController {
  constructor(model) {
    if (!model) {
      throw new Error('Model not provided');
    }
    this.model = model;
  }

  async index({ response }) {
    const registros = await this.model.all();
    return response.json(registros);
  }

  async store({ request, response }) {
    const data = request.only(this.allowedFields());
    const registro = await this.model.create(data);
    return response.status(201).json(registro);
  }

  async show({ params, response }) {
    const registro = await this.model.find(params.id);
    return response.json(registro);
  }

  async update({ params, request, response }) {
    const registro = await this.model.find(params.id);
    const data = request.only(this.allowedFields());
    registro.merge(data);
    await registro.save();
    return response.json(registro);
  }

  async destroy({ params, response }) {
    const registro = await this.model.find(params.id);
    await registro.delete();
    return response.status(204).json({ message: 'Registro deletado com sucesso' });
  }

  allowedFields() {
    return [];
  }
}

module.exports = BaseController;
