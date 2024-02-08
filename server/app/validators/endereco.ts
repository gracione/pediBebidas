import vine from '@vinejs/vine'

/**
 * Validates the endereco's creation action
 */
export const ValidateCreate = vine.compile(
  vine.object({
    rua: vine.string().trim(),
    numero : vine.string().trim(),
    bairro : vine.string().trim(),
    complementar : vine.string().trim(),
    latitude : vine.string().trim().minLength(7),
    longitude : vine.string().trim().minLength(7),
  })
)

/**
 * Validates the endereco's update action
 */
export const ValidateUpdate = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape()
  })
)
