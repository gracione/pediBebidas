import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ValidateCreateMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    const caminho = `#validators${ctx.route?.pattern}`
    const { ValidateCreate } = await import(caminho)

    const data = ctx.request.all()
    await ValidateCreate.validate(data);
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}