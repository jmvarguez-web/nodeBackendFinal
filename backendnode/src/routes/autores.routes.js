import { Router } from "express";
import {
    getAutores
    ,getAutor
    ,deleteAutor
    ,createAutor
    ,updateAutor
} from "../controllers/autores.controllers.js";
import {authenticateToken,authorizeEditor } from '../controllers/auth.js';
const router = Router();

// GET all Autores
router.get("/autores",authenticateToken, getAutores);

// GET An Autor
router.get("/autores/:id",authenticateToken, getAutor);

// DELETE An Autor
router.delete("/autores/:id",authenticateToken, deleteAutor);

// INSERT An Autor
router.post("/autores",authenticateToken, createAutor);

router.put("/autores/:id",authenticateToken, updateAutor);

export default router;