import { HttpContext } from '@adonisjs/core/http'
import Produto from '#models/produto'
import BaseController from './bases_controller.js'

export default class ProdutoController extends BaseController {
  constructor() {
    super(Produto)
  }

}
