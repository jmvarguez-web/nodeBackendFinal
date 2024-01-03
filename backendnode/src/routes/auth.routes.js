import { Router } from "express";
import {
    getProtected,
    getAdmin,
    getEditor,
    createUser,
    loginUser
   
} from "../controllers/auth.controllers.js";
import {authenticateToken,authorizeEditor } from '../controllers/auth.js';
import { signupValidation, loginValidation } from '../validacion.js';

const router = Router();


router.post("/auth/login",loginValidation, loginUser);
router.post("/auth/user",signupValidation, createUser);
router.get("/auth/protected",authenticateToken,getProtected);
router.get("/auth/admin",authenticateToken,getAdmin);
router.get("/auth/editor",authenticateToken,authorizeEditor,getEditor);





export default router;