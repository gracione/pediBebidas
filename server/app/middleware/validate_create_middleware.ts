import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ValidateCreateMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const caminhoValidador = `#validators${ctx.route?.pattern}`
    const { ValidateCreate } = await import(caminhoValidador)

    const data = ctx.request.all()

    const caminhoPreparador = `#models${ctx.route?.pattern}`
    const prepareModule = await import(caminhoPreparador)

    let dadosPreparados = data;
    if (prepareModule.default && typeof prepareModule.default.prepare === 'function') {
      dadosPreparados = prepareModule.default.prepare(data)
    }

    await ValidateCreate.validate(dadosPreparados);

    const output = await next()
    return output
  }
}
