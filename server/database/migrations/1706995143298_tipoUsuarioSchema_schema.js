'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const TipoUsuario = use('App/Models/TipoUsuario');

class TipoUsuarioSchema extends Schema {
  async up() {
    this.create('tipo_usuario', (table) => {
      table.increments();
      table.string('nome').notNullable();
      table.timestamps();
    });

    const count = await TipoUsuario.getCount();

    if (count === 0) {
      await this.raw(`
        INSERT INTO public.tipo_usuario (nome)
        VALUES ('Administrador do Estabelecimento');

        INSERT INTO public.tipo_usuario (nome)
        VALUES ('Cliente');
      `);
    }
  }

  down() {
    this.drop('tipo_usuario');
  }
}

module.exports = TipoUsuarioSchema;
