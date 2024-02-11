import vine from '@vinejs/vine'

/**
 * Validates the usuario's creation action
 */
export const ValidateCreate = vine.compile(
  vine.object({
    nome :  vine.string().trim(),
    telefone :  vine.string().trim(),
    email :  vine.string().trim(),
    password :  vine.string().trim(),
    data_nascimento :  vine.string().trim(),
    rua: vine.string().trim(),
    numero : vine.string().trim(),
    bairro : vine.string().trim(),
    complementar : vine.string().trim(),
    latitude : vine.string().trim().minLength(7),
    longitude : vine.string().trim().minLength(7),
  })
)

/**
 * Validates the usuario's update action
 */
export const ValidateAutenticacao = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(6),
    description: vine.string().trim().escape()
  })
)
