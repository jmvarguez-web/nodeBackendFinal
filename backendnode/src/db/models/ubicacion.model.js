import { Model, DataTypes, Sequelize } from 'sequelize';

const UBICACION_TABLE = 'ubicacion';

export class Ubicacion extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: UBICACION_TABLE,
            modelName: 'Ubicacion',
            timestamps: false
        }
    }
}

export const UbicacionSchema = {
    idubicacion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    ip: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'ip'
    },
    typeip: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'typeip'
    },
    continent_code: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'continent_code'
    },
    continent_name: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'continent_name'
    },
    country_code: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'country_code'
    },
    country_name: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'country_name'
    },
    region_code: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'region_code'
    },
    region_name: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'region_name'
    },
    city: {
        allowNull: true,
        type: DataTypes.STRING,
        field: 'city'
    },
    zip:{
        allowNull: true,
        type: DataTypes.STRING,
        field: 'zip'
    },country_flag:{
        allowNull: true,
        type: DataTypes.STRING,
        field: 'country_flag'
    },latitude:{
        allowNull: true,
        type: DataTypes.STRING,
        field: 'latitude'
    },longitude:{
        allowNull: true,
        type: DataTypes.STRING,
        field: 'longitude'
    }


}

//module.exports = { Ubicacion, UbicacionSchema };