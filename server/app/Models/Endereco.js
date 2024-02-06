'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Endereco extends Model {
    static get table() {
        return 'endereco';
    }
}

module.exports = Endereco
