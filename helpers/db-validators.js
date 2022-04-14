const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async( rol = '' ) => {

    const existeRole = await Role.findOne({rol});
    if ( !existeRole ) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExiste = async( correo = '' ) => {

    const existeEmail = await Usuario.findOne( { correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya esta registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    const existeIsuario = await Usuario.findById( id );
    if ( !existeIsuario ) {
        throw new Error(`El ID: ${ id } no existe`);
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
}


