const { Libro, LibroSchema } = require('./libros.model');
const { Autor, AutorSchema } = require('./autores.model');
const { User,UserSchema } = require('./user.model');
const { Role,RoleSchema } = require('./role.model');




function setupModels(sequelize) {
    Autor.init(AutorSchema, Autor.config(sequelize));
    Libro.init(LibroSchema, Libro.config(sequelize));
    User.init(UserSchema, User.config(sequelize));
    Role.init(RoleSchema, Role.config(sequelize));
}

module.exports = setupModels;