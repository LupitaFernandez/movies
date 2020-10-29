const db = require('../database/models');

module.exports = {
    index : (req,res) => {
        let peliculas = db.Peliculas.findAll({limit : 10})
        let series = db.Series.findAll ({limit : 10})
        
        Promise.all ([peliculas, series])
        .then(function ([peliculas, series]){
            
            res.render('index',{
                peliculas : peliculas,
                series : series
            })
        })
    }
}