import { Router } from "express";

import jwtAuthMiddleware from "../auth/jwtAuthMiddleware";
import csrfCheckMiddleware from "../controllers/utilities/csrfCheckMiddleware";

import { controllerGetToken } from "../controllers/auth/authControllersGet";
import { controllerPostToken } from "../controllers/auth/authControllersPost";
import { controllerDeleteToken } from "../controllers/auth/authControllersDelete";

const authRouter = Router();

// Check authentication
authRouter.get('/token', csrfCheckMiddleware, jwtAuthMiddleware, controllerGetToken);

// Login
authRouter.post('/token', controllerPostToken);

// Logout
authRouter.delete('/token', csrfCheckMiddleware, jwtAuthMiddleware, controllerDeleteToken);

export default authRouter;