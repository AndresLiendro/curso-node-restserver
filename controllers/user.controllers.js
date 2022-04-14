const { response,  } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { emailExiste } = require('../helpers/db-validators');


const usuariosGet = async( req, res = response ) => {

    // const { q, nombre, apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find( query )
    //     .skip( Number( desde ) )
    //     .limit( Number(limite) );

    // const total = await Usuario.countDocuments( query );

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .skip( Number( desde ) )
        .limit( Number(limite) ),
    ])

    res.json({
        total,
        usuarios,
    });
}

const usuariosPut = async( req, res = response ) => {

    // const id = req.params.id;
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // TODO validar BD
    if ( password ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.status(201).json({
        usuario,
    });
}

const usuariosPost = async( req, res = response ) => {    

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario( { nombre, correo, password, rol } );

    // Verificar si el correo existe

    // await emailExiste( correo );
    // const existeEmail = await Usuario.findOne( { correo });
    // if ( existeEmail ) {
    //     return res.status(400).json({
    //         msg: 'Correo ya existente'
    //     })
    // }

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    // Guardar en DB
    await usuario.save();

    // const { nombre, edad } = req.body;
    
    res.json({
        usuario,
    });
}

const usuariosDelete = async( req, res = response ) => {

    const { id } = req.params;

    // Borrado fisico
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Borrado logico
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json( usuario );
}

const usuariosPathc = ( req, res = response ) => {
    res.json({
        msg: "patch API - Controlador"
    });
}



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPathc
}