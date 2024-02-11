import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario';
import BaseController from './bases_controller.js';
import { ValidateCreate, ValidateUpdate} from '#validators/usuario';
import hash from '@adonisjs/core/services/hash'

export default class UsuariosController extends BaseController{
    constructor() {
        super(Usuario);
        
        this.setValidate({ValidateCreate, ValidateUpdate});
    }

    async autenticarUsuario({ request }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        const user = await Usuario.findBy('email', email)
        if (!user) {
            response.abort('Invalid credentials')
        }
        
        await hash.verify(user.password, password)
        const token = await Usuario.accessTokens.create(user)
        return token;
    }

}