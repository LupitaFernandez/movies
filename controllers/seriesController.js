const { validationResult } = require('express-validator');
const { Sequelize } = require('../database/models')
let db = require('../database/models')

let Op = Sequelize.Op; //operadores

let moment = require('moment');

module.exports = {
    list : function(req,res){
        db.Series.findAll({
            include: [
                {
                    association : 'genero'
                }
            ]
        }
        )
        .then( series => {

            res.send(series)
        })
        .catch(error => res.send(error))
    },
    all : function(req,res){
        db.Series.findAll()
        .then(series => {
            res.render('series',{
                series: series
            })
        })
        .catch(error => {
            res.send(error)
        })
    },
    detail : function(req,res){
        db.Series.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {
                    association : 'genero'
                }
            ]
        })
        .then(serie => {
            console.log(serie.genero)
            res.render('seriesDetail',{
                serie : serie,
                genero : serie.genero,
            })
        })
    },
    new : function(req,res){
        db.Series.findAll({
            order : [
                ['release_date','DESC'] //ordenados por fecha
            ],
            limit : 5
        })
        .then(series => {
                res.render('seriesNew',{
                series : series
            })
        })
    },
    search : function(req,res){
        let search = req.body.search

        db.Series.findAll({
            where: {
                title : {
                    [Op.like] : `%${search}%`
                }
            }
        })
        .then(series => {
            res.render('series',{
            series : series
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
            res.render('seriesAdd',{
                generos : generos,
            })
        })
       
    },
    save : function(req,res){
        //res.send(req.body.actores)
        let errors = validationResult(req);
        if(errors.isEmpty()){
            db.Series.create({
                title : req.body.title,
                rating : req.body.rating,
                release_date : req.body.release_date,
                end_date : req.body.end_date,
                genre_id : req.body.genre
            })
            .then( newSerie => {
                console.log(newSerie)
                return res.redirect('/series')
            })
        }else{
            res.render('seriesAdd',{
                errors :errors.mapped(),
                old : req.body
            })
        }
    },
    edit : function(req,res){
        let pelicula = db.Series.findOne({
            where : {
                id : req.params.id
            },
            include : [
                {association : 'genero'}
            ]
        });
        let generos = db.Generos.findAll();
  
        Promise.all([serie,generos])
        .then(([serie,generos]) => {
            res.render('seriesEdit',{
                generos : generos,
                serie : serie,
                estreno : moment(serie.release_date).format('YYYY-MM-DD') //edito el formato de la fecha para que se muestra de manera correcta en el value de 'fecha de estreno'
            })
        })
    },
    update : function(req,res){
        let errors = validationResult(req)
        if(errors.isEmpty()){
            db.Series.update(
                {
                    title : req.body.title,
                    rating : req.body.rating,
                    awards : req.body.awards,
                    release_date : req.body.release_date,
                    end_date : req.body.end_date,
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
            return res.redirect('/series/detail/'+req.params.id)
        })
        .catch( error => {
            res.send(error)
        })
        }else{
            db.Series.findByPk(req.params.id)
            .then( serie => {
                res.render('seriesEdit',{
                    errors : errors.mapped(),
                    old : req.body,
                    serie : serie,
                    estreno : moment(serie.release_date).format('YYYY-MM-DD') //edito el formato de la fecha para que se muestra de manera correcta en el value de 'fecha de estreno'
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

        db.Series.destroy({
            where : {
                id : req.params.id
            }
        })
        .then( result => {
            console.log('Serie Eliminada');
            return res.redirect('/series')
        })
        .catch(error => res.send(error))
    }
}