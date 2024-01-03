import { Model, DataTypes, Sequelize } from 'sequelize';

const AUTOR_TABLE = 'autores';

export class Autor extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: AUTOR_TABLE,
            modelName: 'Autor',
            timestamps: false
        }
    }
}

export const AutorSchema = {
    idautor: {
        allowNull: false,
        autoIncrement: true,
        Comment:"Clave autor",
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    Nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        Comment:"Nombre autor",
        field: 'Nombre'
    },Apellido: {
        allowNull: true,
        type: DataTypes.STRING,
        Comment:"Apellido autor",
        field: 'Apellido'
    }

}

//module.exports = { Autor, AutorSchema };