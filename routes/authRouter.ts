import { Router } from "express";

import jwtAuthMiddleware from "../auth/jwtAuthMiddleware";

import { controllerPostToken } from "../controllers/auth/authControllerPost";
import { controllerDeleteToken } from "../controllers/auth/authControllerDelete";

const authRouter = Router();

// Login
authRouter.post('/token', controllerPostToken);

// Logout
authRouter.delete('/token', jwtAuthMiddleware, controllerDeleteToken);

export default authRouter;