import { HttpContext } from '@adonisjs/core/http';
import Endereco from '#models/endereco';
import BaseController from './bases_controller.js';
import { ValidateCreate, ValidateUpdate} from '#validators/endereco';
export default class EnderecosController extends BaseController {

    constructor() {
        super(Endereco);
        
        this.setValidate({ValidateCreate, ValidateUpdate});
    }
}
