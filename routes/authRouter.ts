import { Router } from "express";

import jwtAuthMiddleware from "../auth/jwtAuthMiddleware";

import { controllerGetToken } from "../controllers/auth/authControllerGet";
import { controllerPostToken } from "../controllers/auth/authControllerPost";
import { controllerDeleteToken } from "../controllers/auth/authControllerDelete";

const authRouter = Router();

// Check authentication
authRouter.get('/token', jwtAuthMiddleware, controllerGetToken);

// Login
authRouter.post('/token', controllerPostToken);

// Logout
authRouter.delete('/token', jwtAuthMiddleware, controllerDeleteToken);

export default authRouter;