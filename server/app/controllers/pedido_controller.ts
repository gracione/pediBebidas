import { HttpContext } from '@adonisjs/core/http'
import Pedido from '#models/pedido'
import BaseController from './bases_controller.js'
import PedidoProduto from '#models/pedidoProduto'

export default class PedidoController extends BaseController {
  constructor() {
    super(Pedido)
  }

  async store({ auth, request, response }: HttpContext) {
    const data = request.all()
    let dataPedido:any = {
      tp_situacao : 'p',
      id_usuario : auth.user?.id,
      id_endereco : auth.user?.id_endereco,
      valor: data.valor
    };
    const { id: idPedido } = await Pedido.create(dataPedido)
    const keys = Object.keys(data.pedidos)
    let value:any= {};
    keys.forEach((idProdutoProduto) => {
      value = data.pedidos[idProdutoProduto]
      let produtoPedido:any = {
        id_produto: idProdutoProduto,
        quantidade: value.quantidade,
        id_pedido: idPedido,
      }
      PedidoProduto.create(produtoPedido)
    })
    
    return response.created(idPedido)
  }
}
