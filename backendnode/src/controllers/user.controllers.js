import { pool } from "../db.js";
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import {generateAccessToken } from './auth.js';

export const getUsers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT iduser, nombre, apellido, username, email FROM user");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM user WHERE iduser = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Usuario no encontrado " });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    console.log(req);
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM user WHERE iduser = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    res.sendStatus(204);/*todo fue bien pero no devuelve resultadio*/
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};
/*SELECT iduser, nombre, apellido, username, email, password*/
export const createUser = async (req, res) => {
  try {
    console.log(req.body);
    // Acceder a los datos validados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const [rowsuser] = await pool.query("SELECT * FROM user WHERE email = ?", [
      req.body.email,
    ]);
    if (rowsuser.length > 0) {
      return res.status(404).json({ message: "El correo ya esta en uso " });
    }


    const { nombre, apellido, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await pool.query(
      "INSERT INTO user (nombre, apellido, username, email, password) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, username, email, hashedPassword]
    );
    res.status(201).json({ iduser: rows.insertId, nombre, apellido, username, email, hashedPassword });
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal createUser: "+error.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [
      req.body.email,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({ message: "no se encontro ningun usuario " });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      rows[0].password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Contraseña invalida",
      });
    }
    const user={    
      id:rows[0].iduser, 
      nombre:rows[0].nombre, 
      apellido:rows[0].apellido, 
      username:rows[0].username, 
      email:rows[0].email
    };

    const token=generateAccessToken(user);
    res.json({token:token});
   // res.json(rows[0]);

} catch (error) {
    return res.status(500).json({ message: "Algo va mal createUser: "+error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log(req.body);
    // Acceder a los datos validados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { nombre, apellido, username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "UPDATE user SET nombre= IFNULL(?, nombre), apellido= IFNULL(?, apellido), username= IFNULL(?, username), email= IFNULL(?, email), password= IFNULL(?, password)  WHERE iduser = ?",
      [nombre, apellido, username, email, hashedPassword, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Autor no encontrado" });

    const [rows] = await pool.query("SELECT * FROM user WHERE iduser = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};