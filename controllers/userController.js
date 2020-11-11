const db = require('../database/models');

const bcrypt = require('bcrypt');

const {
    validationResult
} = require('express-validator');

module.exports = {
    register: function (req, res) {
        res.render('register')
    },
    processRegister: function (req, res) {
        
        db.Usuarios.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.pass, 10),
                name : req.body.name,
                rol : "user"
            })
            .then(result => {
                console.log('El usuario ha sido registrado')
                res.redirect('/users/login')
            })
            .catch(errors => res.send(errors))
    },
    login: function (req, res) {
        res.render('login')
    },
    processLogin: function (req, res) {
        let errors = validationResult(req); 
        if (errors.isEmpty()) {

            db.Usuarios.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then(usuario =>{
                    req.session.user = {
                        id : usuario.id,
                        name : usuario.name,
                        rol : usuario.rol
                    }
                    return res.redirect('/')
                }
                )
        } else {
            res.render('login', {
                errors: errors.mapped()
            })
        }
    },
    logout : function(req,res){
        req.session.destroy()
        res.redirect('/')
    }
}