import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'O campo {{ field }} é obrigatório',
  'string': 'O valor do campo {{ field }} deve ser uma string',
  'email': 'O valor não é um endereço de e-mail válido',

  // Error message for the username field
  'username.required': 'Por favor, escolha um nome de usuário para sua conta',
})
