import { HttpContext } from '@adonisjs/core/http'
import Pedido from '#models/pedido'
import BaseController from './bases_controller.js'
import PedidoProduto from '#models/pedidoProduto'

export default class PedidoController extends BaseController {
  constructor() {
    super(Pedido)
  }

  async store({ request, response }: HttpContext) {
    let dataPedido:any = [];
    //temporario
    dataPedido['tp_situacao'] = 'N'
    dataPedido['id_usuario'] = 31
    dataPedido['id_endereco'] = 15

    const { id: idPedido } = await Pedido.create(dataPedido)
    const data = request.all()
    const keys = Object.keys(data.pedidos)
    let value:any= {};
    keys.forEach((idProduto) => {
      value = data.pedidos[idProduto]
      let produtoPedido:any = {
        id_produto: idProduto,
        quantidade: value.quantidade,
        id_pedido: idPedido,
      }
      PedidoProduto.create(produtoPedido)
    })
    
    return response.created(idPedido)
  }
}
