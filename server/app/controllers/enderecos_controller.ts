import { HttpContext } from '@adonisjs/core/http'
import {
    createEnderecoValidator
} from '#validators/endereco'
import Endereco from '#models/endereco'
import BaseController from './bases_controller.js'

export default class EnderecosController extends BaseController{
    constructor() {
        super(Endereco)
    }

    async index(ctx: HttpContext) {
        const data = {}
        const payload = await createEnderecoValidator.validate(data)
        return [{1:2}];
    }
}
