const db = require('../database/models');

const {check,body} = require('express-validator');

const bcrypt = require('bcrypt');

module.exports = [
    check('email')
    .isEmail()
    .withMessage('Debes ingresar un email válido'),

    check('pass')
    .isLength({
        min:1
    })
    .withMessage('Escribe tu contraseña'),

    body('pass')
    .custom((value,{req})=>{
       
        return db.Usuarios.findOne({
            where:{
                email:req.body.email
            }
        })
        .then(user => {
            if(!bcrypt.compareSync(value,user.dataValues.password)){ //si no machea la contraseña
                return Promise.reject('estas mal')
            }
        })
        .catch(() => {
            return Promise.reject('Credenciales inválidas')
        })
    })
]