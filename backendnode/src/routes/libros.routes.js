import { Router } from "express";
import {pool} from '../db.js';
import {
    getLibros
    ,getLibro
    ,getLibrosPalabra
    ,deleteLibro
    ,createLibro
    ,updateLibro
} from "../controllers/libros.controllers.js";
import {authenticateToken,authorizeEditor } from '../controllers/auth.js';

const router = Router();
router.get("/libros/palabra/:palabra",authenticateToken, getLibrosPalabra);
// GET all Libros
router.get("/libros",authenticateToken, getLibros);

// GET An Libro
router.get("/libros/:id",authenticateToken, getLibro);

// DELETE An Libro
router.delete("/libros/:id",authenticateToken, deleteLibro);

// INSERT An Libro
router.post("/libros",authenticateToken, createLibro);

router.patch("/libros/:id",authenticateToken, updateLibro);

export default router;