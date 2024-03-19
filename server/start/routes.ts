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
import EstabelecimentoController from '#controllers/estabelecimento_controller'

// router.resource('endereco', EnderecosController).apiOnly()
router
  .group(() => {
    router.put('/endereco', [EnderecosController, 'updateAddressUser'])
    router.get('/endereco', [EnderecosController, 'show'])
    router.post('/estabelecimento', [EstabelecimentoController, 'store'])
    router.get('/estabelecimento-por-usuario', [EstabelecimentoController, 'show'])
    router.get('/estabelecimento', [EstabelecimentoController, 'index'])
  })
  .use(middleware.auth({ guards: ['api'] }))

router.post('usuario', [UsuarioController, 'store'])
router.post('usuario/autenticar', [UsuarioController, 'autenticarUsuario'])
