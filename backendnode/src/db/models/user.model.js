import { Model, DataTypes, Sequelize } from 'sequelize';

const USER_TABLE = 'user';

export class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false
        }
    }
}

export const UserSchema = {
    iduser: {
        allowNull: false,
        autoIncrement: true,
        Comment:"Clave User",
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        Comment:"Nombre de usuario",
        field: 'nombre'
    },apellido: {
        allowNull: true,
        type: DataTypes.STRING,
        Comment:"Apellido usuario",
        field: 'apellido'
    },username: {
        allowNull: false,
        type: DataTypes.STRING,
        Comment:"nombre de usuario",
        field: 'username'
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        Comment:"correo",
        field: 'email'
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
        Comment:"password",
        field: 'password'
    }

}

