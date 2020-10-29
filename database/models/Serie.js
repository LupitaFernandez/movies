const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) => {

    let alias = "Series"

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
        release_date: {
            type: dataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: dataTypes.DATE,
            allowNull: false,
        },
        genre_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            defaultValue: null
        }
    }

    let config = {
        tableName: "series",
        timestamps: true,
        underscored: true
    }

    const Serie = sequelize.define (alias, cols, config);

    Serie.associate = function (models){

        Serie.belongsTo (models.Generos, {
            as: 'genero',
            foreignKey: 'genre_id'
        })
    }

    return Serie
}