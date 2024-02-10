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
    id_tipo_usuario :  vine.string().trim(),
    id_endereco :  vine.string().trim(),
  })
)

/**
 * Validates the usuario's update action
 */
export const ValidateUpdate = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(6),
    description: vine.string().trim().escape()
  })
)
