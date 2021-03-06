
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio'],
    },

    img: {
        type: String,
    },

    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTA_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: true
    },

});

UsuarioSchema.methods.toJSON = function() {

    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );