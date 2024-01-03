import { Model, DataTypes, Sequelize } from 'sequelize';
import { Autor, AutorSchema }  from './autores.model.js';
const LIBRO_TABLE = 'libros';

export  class Libro extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: LIBRO_TABLE,
            modelName: 'Libro',
            timestamps: false
        }
    }
}

export const LibroSchema = {
    idlibro: {
        allowNull: false,
        autoIncrement: true,
        Comment:"Clave",
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    isbn: {
        allowNull: true,
        type: DataTypes.STRING,
        Comment:"ISBN",
        field: 'isbn'
    }, titulo: {
        allowNull: false,
        Comment:"Titulo",
        type: DataTypes.STRING,
        field: 'titulo'
    },
    autorfkid: {
        type: DataTypes.INTEGER,
        Comment:"Clave foranea autor",
        allowNull: true,
        references: {
            model: Autor,
            key: 'idautor'
        },
        field: 'autor_id'
    } ,
    paginas: {
        allowNull: true,
        Comment:"Paginas",
        type: DataTypes.INTEGER,
        field: 'paginas'
    },
    fechaPublicacion: {
        allowNull: true,
        Comment:"Fecha Publicación",
        type: DataTypes.DATE,
        field: 'fecha_publicacion'
    } ,
    anio: {
        allowNull: true,
        Comment:"Año",
        type: DataTypes.INTEGER,
        field: 'anio'
    },
    editorial: {
        allowNull: true,
        Comment:"Editorial",
        type: DataTypes.STRING,
        field: 'editorial'
    },edicion: {
        allowNull: true,
        Comment:"Edición",
        type: DataTypes.STRING,
        field: 'edicion'
    }
}

//module.exports = { Libro, LibroSchema };