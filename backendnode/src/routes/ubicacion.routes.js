import { Router } from "express";

import {
    getUbicacion
} from "../controllers/ubicacion.controllers.js";
const router = Router();

// GET all Autores
router.get("/ubicacion", getUbicacion);
export default router;