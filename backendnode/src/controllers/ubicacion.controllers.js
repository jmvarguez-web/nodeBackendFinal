import { pool } from "../db.js";
import fetch from 'node-fetch';
import {publicIp, publicIpv4, publicIpv6} from 'public-ip';
import {config} from '../config/config.js';

export const getUbicacion = async (req, res) => {
  try {
    const publicIpp =await publicIpv4();
    if (publicIpp.success) {
      throw new Error('Error al obtener la ip');
    }

    const API_ENDPOINT = `http://api.ipapi.com/${publicIpp}?access_key=${config.keyacces}`;
    const response = await fetch(API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error('Error al obtener la ubicación');
    }

    const datosUbicacion = await response.json();

    console.log(datosUbicacion);
    
    const {
      ip,
      type: typeip,
      continent_code,
      continent_name,
      country_code,
      country_name,
      region_code,
      region_name,
      city,
      zip,
      location: { country_flag },
      latitude,
      longitude
    } = datosUbicacion;

    console.log(`Tus coordenadas son ${latitude},${longitude}`);

    
    const [rows] = await pool.query(
      "INSERT INTO ubicacion (ip, typeip, continent_code, continent_name, country_code, country_name, region_code, region_name, city, zip, country_flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [ip, typeip, continent_code, continent_name, country_code, country_name, region_code, region_name, city, zip, country_flag]
    );

  
    
    res.status(200).json({
      idubicacion: rows.insertId,
      ip,
      typeip,
      continent_code,
      continent_name,
      country_code,
      country_name,
      region_code,
      region_name,
      city,
      zip,
      country_flag,
      latitude,
      longitude
    });
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Algo va mal" });
  }
};
