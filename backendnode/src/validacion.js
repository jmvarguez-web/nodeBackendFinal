import { check } from 'express-validator';
// nombre, apellido, username, email, passwor
export const signupValidation = [
    check('nombre', 'Nombre es requerido').not().isEmpty(),
    check('apellido', 'Apellido es requerido').not().isEmpty(),
    check('username', 'Nombrede usuario es requerido').not().isEmpty(),
    check('email', 'Por favor incluya un correo electrónico válido').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'La contraseña debe tener 6 o más caracteres.').isLength({ min: 6 })
]

export const loginValidation = [
     check('email', 'Por favor incluya un correo electrónico válido').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     check('password', 'La contraseña debe tener 6 o más caracteres.').isLength({ min: 6 })

]