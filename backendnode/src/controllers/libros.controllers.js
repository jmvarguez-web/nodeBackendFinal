import { pool } from "../db.js";

export const getLibros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM libros");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const getLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM libros WHERE idlibro = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};
export const getLibrosPalabra = async (req, res) => {
  try {
    const { palabra } = req.params;
    const [rows] = await pool.query("SELECT * FROM libros WHERE titulo LIKE ? or editorial LIKE ?", [
      `%${palabra}%`, `%${palabra}%`
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Libro no encontrado en getLibrosPalabra" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};

export const deleteLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM libros WHERE idlibro = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Libro no encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};

export const createLibro = async (req, res) => {
  try {
    const { 
      isbn
      ,titulo
      ,autor_id
      ,paginas
      ,fecha_publicacion
      ,anio
      ,editorial
      ,edicion
      } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO libros ( isbn,titulo,autor_id,paginas,fecha_publicacion,anio,editorial,edicion) VALUES (?,?,?,?,?,?,?,?)",
      [ isbn
        ,titulo
        ,autor_id
        ,paginas
        ,fecha_publicacion
        ,anio
        ,editorial
        ,edicion]
    );
    res.status(201).json({ id: rows.insertId,  isbn
      ,titulo
      ,autor_id
      ,paginas
      ,fecha_publicacion
      ,anio
      ,editorial
      ,edicion });
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};
/*const [result] = await pool.query(
  "UPDATE libros SET isbn = IFNULL(?, isbn), titulo = ISNULL(?, titulo), autor_id = ISNULL(?, autor_id), paginas = ISNULL(?, paginas), fecha_publicacion = ISNULL(?, fecha_publicacion), anio = ISNULL(?, anio), editorial = ISNULL(?, editorial), edicion = ISNULL(?, edicion) WHERE idlibro = ?",
  [isbn, titulo, autor_id, paginas, fecha_publicacion, anio, editorial, edicion, idlibro]
);
 */
export const updateLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const {  
      isbn
      ,titulo
      ,autor_id
      ,paginas
      ,fecha_publicacion
      ,anio
      ,editorial
      ,edicion } = req.body;
    const [result] = await pool.query(
      "UPDATE libros SET isbn= IFNULL(?, isbn),titulo=IFNULL(?, titulo),autor_id= IFNULL(?, autor_id),paginas= IFNULL(?, paginas),fecha_publicacion= IFNULL(?, fecha_publicacion),anio= IFNULL(?, anio),editorial= IFNULL(?, editorial),edicion= IFNULL(?, edicion) WHERE idlibro = ?",
      [ isbn
        ,titulo
        ,autor_id
        ,paginas
        ,fecha_publicacion
        ,anio
        ,editorial
        ,edicion,id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Libro no encontrado" });

    const [rows] = await pool.query("SELECT * FROM libros WHERE idlibro = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal: "+error.message });
  }
};