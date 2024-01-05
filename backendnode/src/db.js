import { createPool } from 'mysql2/promise.js';
import { Sequelize } from 'sequelize';

import {config} from './config/config.js';
 import { Libro, LibroSchema } from './db/models/libros.model.js';
import { Autor, AutorSchema } from './db/models/autores.model.js';
import { User,UserSchema } from './db/models/user.model.js';
import { Role,RoleSchema } from'./db/models/role.model.js';




const sequelize = new Sequelize(
  config.dbName, 
  config.dbUser, 
  config.dbPassword, 
  {
      host: config.dbHost,
      port:config.dbPort,
      dialect: 'mysql'
  }
);

sequelize.sync();
Autor.init(AutorSchema, Autor.config(sequelize));
Libro.init(LibroSchema, Libro.config(sequelize));
User.init(UserSchema, User.config(sequelize));
Role.init(RoleSchema, Role.config(sequelize));

export const pool = createPool({
  host:config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  port: config.dbPort,
  database: config.dbName,
});







