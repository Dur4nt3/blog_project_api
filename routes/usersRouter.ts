import { Router } from "express";

import jwtAuthMiddleware from "../auth/jwtAuthMiddleware";

import { controllerPostSignup } from "../controllers/users/usersControllersPost";

const usersRouter = Router();

usersRouter.post('/', controllerPostSignup);

export default usersRouter;