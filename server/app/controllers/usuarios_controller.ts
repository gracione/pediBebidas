// import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario';
import BaseController from './bases_controller.js';
import { ValidateCreate, ValidateUpdate} from '#validators/usuario';

export default class UsuariosController extends BaseController{
    constructor() {
        super(Usuario);
        
        this.setValidate({ValidateCreate, ValidateUpdate});
    }

}