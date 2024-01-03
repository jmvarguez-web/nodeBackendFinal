import { pool } from "../db.js";

export const getAutores = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM autores");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const getAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM autores WHERE idautor = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Autor no encontrado " });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};

export const deleteAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM autores WHERE idautor = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Autor no encontrado" });
    }

    res.sendStatus(204);/*todo fue bien pero no devuelve resultadio*/
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};

export const createAutor = async (req, res) => {
  try {
    console.log(req.body);
    const { Nombre,Apellido } = req.body;
   
    const [rows] = await pool.query(
      "INSERT INTO autores (Nombre,Apellido) VALUES (?, ?)",
      [Nombre,Apellido]
    );
    res.status(201).json({ idautor: rows.insertId, Nombre,Apellido });
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal : "+error.message });
  }
};

export const updateAutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre,Apellido } = req.body;

    const [result] = await pool.query(
      "UPDATE autores SET Nombre = IFNULL(?, Nombre), Apellido = IFNULL(?, Apellido) WHERE idautor = ?",
      [Nombre,Apellido, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Autor no encontrado" });

    const [rows] = await pool.query("SELECT * FROM autores WHERE idautor = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};