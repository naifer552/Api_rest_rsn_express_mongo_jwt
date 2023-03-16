import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    };
    next();
};

const bodyRegisterValidator = [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('user', 'Formato de usuario incorrecto').trim(),
    body('password', 'Minimo 6 caracteres').trim().isLength({min: 6}),
    body('password', 'Formato de contrasena incorrecta')
    .custom((value, {req}) => {
        if (value !== req.body.repassword) {
            throw new Error ('No coinciden las contrasenas');
        };
        return value;
    }),
    validationResultExpress
];

const bodyLoginValidator = [
    body('email', 'Formato de email incorrecto').trim().isEmail().normalizeEmail(),
    body('password', 'Minimo 6 caracteres').trim().isLength({min: 6})
];

export { bodyRegisterValidator, bodyLoginValidator };