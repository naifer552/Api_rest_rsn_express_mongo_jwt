import express from "express";
import { register, users, user, login, refreshToken, logout } from "../controlllers/usersController.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";


const router = express.Router();

router.get('/', requireToken, users);
router.get('/:id', requireToken, user);
router.get('/refresh', requireRefreshToken, refreshToken);
router.get('/logout', logout);
router.post('/register', bodyRegisterValidator, register);
router.post('/login', bodyLoginValidator, login);


export default router;