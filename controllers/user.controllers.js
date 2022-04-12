const { response,  } = require('express');


const usuariosGet = ( req, res = response ) => {

    const { q, nombre, apikey } = req.query;

    res.json({
        msg: "get API - Controlador",
        q,
        nombre,
        apikey,
    });
}

const usuariosPut = ( req, res = response ) => {

    // const id = req.params.id;
    const { id } = req.params;

    res.status(201).json({
        msg: "put API - Controlador",
        id
    });
}

const usuariosPost = ( req, res = response ) => {

    // const body = req.body;
    const { nombre, edad } = req.body;
    
    res.json({
        msg: "post API - Controlador",
        nombre,
        edad
    });
}

const usuariosDelete = ( req, res = response ) => {
    res.json({
        msg: "delete API - Controlador"
    });
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