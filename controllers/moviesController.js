const { validationResult } = require('express-validator');
const { Sequelize } = require('../database/models')
let db = require('../database/models')

let Op = Sequelize.Op; //operadores

let moment = require('moment');

module.exports = {
    list : function(req,res){
        db.Peliculas.findAll({
            include: [
                {
                    association : 'genero'
                }
            ]
        }
        )
        .then( peliculas => {

            res.send(peliculas)
        })
        .catch(error => res.send(error))
    },
    all : function(req,res){
        db.Peliculas.findAll()
        .then(peliculas => {
            res.render('movies',{
                peliculas: peliculas
            })
        })
        .catch(error => {
            res.send(error)
        })
    },
    detail : function(req,res){
        db.Peliculas.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {
                    association : 'genero'
                }
            ]
        })
        .then(pelicula => {
            console.log(pelicula.genero)
            res.render('moviesDetail',{
                pelicula : pelicula,
                genero : pelicula.genero,
            })
        })
    },
    new : function(req,res){
        db.Peliculas.findAll({
            order : [
                ['release_date','DESC'] //ordenados por fecha
            ],
            limit : 5
        })
        .then(peliculas => {
                res.render('moviesNew',{
                peliculas : peliculas
            })
        })
    },
    recommended : function(req,res){
        db.Peliculas.findAll({
            where: {
                awards : {
                    [Op.gte] : 8 //premio mayor o igual a 8
                }
            }
        })
        .then(peliculas => {
            res.render('moviesRecommended',{
                peliculas : peliculas
            })
        })
    },
    search : function(req,res){
        let search = req.body.search

        db.Peliculas.findAll({
            where: {
                title : {
                    [Op.like] : `%${search}%`
                }
            }
        })
        .then(peliculas => {
            res.render('movies',{
                peliculas : peliculas
            })
        })
    },
    create : function(req,res){
        db.Generos.findAll({
            order : [
                ['name','ASC']
            ]
        })
        .then( generos => {
            res.render('moviesAdd',{
                generos : generos,
            })
        })
       
    },
    save : function(req,res){
        //res.send(req.body.actores)
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.Peliculas.create({
                title : req.body.title,
                rating : req.body.rating,
                awards : req.body.awards,
                release_date : req.body.release_date,
                length : req.body.length,
                genre_id : req.body.genre
            })
            .then( newPeli => {
                console.log(newPeli)
                return res.redirect('/movies')
            })
        }else{
            res.render('moviesAdd',{
                errors :errors.mapped(),
                old : req.body
            })
        }
    },
    edit : function(req,res){
        let pelicula = db.Peliculas.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {association : 'genero'}
            ]
        });
        let generos = db.Generos.findAll();
  
        Promise.all([pelicula,generos])
        .then(([pelicula,generos]) => {
            res.render('moviesEdit',{
                generos : generos,
                pelicula : pelicula,
                estreno : moment(pelicula.release_date).format('YYYY-MM-DD') //edito el formato de la fecha para que se muestra de manera correcta en el value de 'fecha de estreno'
            })
        })
    },
    update : function(req,res){
        let errors = validationResult(req)
        if(errors.isEmpty()){
            db.Peliculas.update(
                {
                    title : req.body.title,
                    rating : req.body.rating,
                    awards : req.body.awards,
                    release_date : req.body.release_date,
                    length : req.body.length,
                    genre_id : req.body.genre
                },
                {
                    where : {
                        id : req.params.id
                    }
                }   
        )
        .then( result => {
            console.log(result)
            return res.redirect('/movies/detail/'+req.params.id)
        })
        .catch( error => {
            res.send(error)
        })
        }else{
            db.Peliculas.findByPk(req.params.id)
            .then( pelicula => {
                res.render('moviesEdit',{
                    errors : errors.mapped(),
                    old : req.body,
                    pelicula : pelicula,
                    estreno : moment(pelicula.release_date).format('YYYY-MM-DD') //edito el formato de la fecha para que se muestra de manera correcta en el value de 'fecha de estreno'
                })
            })
        }
    },
    delete : function(req,res){
        db.actor_movie.destroy({
            where : {
                movie_id : req.params.id
            }
        })
        .then( result => console.log('se ha eliminado la relación correctamente'))
        .catch(error => res.send(error))

        db.Peliculas.destroy({
            where : {
                id : req.params.id
            }
        })
        .then( result => {
            console.log('Pelicula Eliminada');
            return res.redirect('/movies')
        })
        .catch(error => res.send(error))
    }
}