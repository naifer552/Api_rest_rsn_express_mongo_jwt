import express from "express";
import { register, users, user, login } from "../controlllers/usersController.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";


const router = express.Router();

router.get('/', users);
router.get('/:id', user);
router.post('/register', bodyRegisterValidator, register);
router.post('/login', bodyLoginValidator, login);

export default router;