module.exports = (sequelize,dataTypes) => {

    let alias = "Usuarios"

    let cols = {
        id : {
            type : dataTypes.INTEGER (11).UNSIGNED,
            autoIncrement : true,
            allowNull : false,
            primaryKey :true
        },
        email : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        password : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        name : {
            type : dataTypes.STRING(45),
            allowNull : false
        },
        rol : {
            type : dataTypes.STRING(45),
            allowNull : false
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
        
    }


    const User = sequelize.define(alias,cols,config);


    return User

}