import { Model, DataTypes, Sequelize } from 'sequelize';

const ROLE_TABLE = 'role';

export class Role extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: ROLE_TABLE,
            modelName: 'Role',
            timestamps: false
        }
    }
}

export const RoleSchema = {
    idrole: {
        allowNull: false,
        autoIncrement: true,
        Comment:"Clave rol",
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nombre: {
        allowNull: false,
        type: DataTypes.STRING,
        Comment:"Nombre de rol",
        field: 'Nombre'
    }

}

