/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import EnderecosController from '#controllers/enderecos_controller'
import UsuarioController from '#controllers/usuarios_controller'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('endereco', EnderecosController).apiOnly()
router.post('usuario', [UsuarioController, 'store'])
router.post('usuario/autenticar', [UsuarioController,'autenticarUsuario'])

router.post('test', async ({ auth }) => {})
  .use(middleware.auth({
    guards: ['api']
  }))
