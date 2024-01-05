import { Router } from "express";
import {
    getUsers
    ,getUser
    ,deleteUser
    ,createUser
    ,updateUser
    
} from "../controllers/user.controllers.js";
import {authenticateToken,authorizeEditor } from '../controllers/auth.js';
import { signupValidation, loginValidation } from '../validacion.js';
const router = Router();


// GET all user
router.get("/users",authenticateToken, getUsers);

// GET An user
router.get("/users/:id",authenticateToken, getUser);

// DELETE An user
router.delete("/users/:id",authenticateToken, deleteUser);

// INSERT An user
router.post("/users",authenticateToken,signupValidation, createUser);

router.patch("/users/:id",authenticateToken,signupValidation, updateUser);

export default router;