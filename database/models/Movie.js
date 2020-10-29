const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {

    let alias = "Peliculas"

    let cols = {
        id : {
            type: dataTypes.INTEGER (10).UNSIGNED,
            autoIncrement: true, 
            allowNull: false,
            primaryKey: true
        },
        title : {
            type: dataTypes.STRING (500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL (3,1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        release_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        length: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        },
        genre_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        }
    }

    let config = {
        tableName: "movies",
        timestamps: true,
        underscored: true
    }

    const Movie = sequelize.define (alias, cols, config);

    Movie.associate = function (models){

        Movie.belongsTo (models.Generos, {
            as: 'genero',
            foreignKey: 'genre_id'
        })
    }

    return Movie
}