import vine from '@vinejs/vine'

export const ValidateCreate = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    rua: vine.string().trim(),
    numero: vine.string().trim(),
    bairro: vine.string().trim(),
    complementar: vine.string().trim(),
    latitude: vine.string().trim().minLength(7),
    longitude: vine.string().trim().minLength(7),
  })
)

export const ValidateUpdate = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    rua: vine.string().trim(),
    numero: vine.string().trim(),
    bairro: vine.string().trim(),
    complementar: vine.string().trim(),
    latitude: vine.string().trim().minLength(7),
    longitude: vine.string().trim().minLength(7),
  })
)
