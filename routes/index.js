import express from "express";
import user from "./usersRoute.js"

function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/user', user)
};

export default routerApi;