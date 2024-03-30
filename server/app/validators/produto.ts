import vine from '@vinejs/vine'

/**
 * Validates the produto's creation action
 */
export const ValidateCreate = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    valor : vine.string().trim(),
  })
)
