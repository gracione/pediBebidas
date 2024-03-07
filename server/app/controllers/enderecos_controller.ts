import { HttpContext } from '@adonisjs/core/http';
import Endereco from '#models/endereco';
import BaseController from './bases_controller.js';
import { ValidateCreate, ValidateUpdate} from '#validators/endereco';
export default class EnderecosController extends BaseController {

    constructor() {
        super(Endereco);
        
        this.setValidate({ValidateCreate, ValidateUpdate});
    }

    async updateAddressUser({ auth, params, request, response }: HttpContext) {
      const idEndereco = auth.user?.id_endereco;
        const instance = await this.Model.find(idEndereco)
        if (!instance) {
          return response.notFound({ message: `${this.Model.name} not found` })
        }
        
        const data = request.all();
        instance.merge(data)
        await instance.save()
        return response.ok(instance)
      }
    
}
