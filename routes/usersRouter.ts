import { Router } from "express";

import jwtAuthMiddleware from "../auth/jwtAuthMiddleware";

import { controllerGetUserPermissions, controllerGetUserDetails } from "../controllers/users/usersControllersGet";
import { controllerPostSignup } from "../controllers/users/usersControllersPost";

const usersRouter = Router();

// Get user info
usersRouter.get('/me', jwtAuthMiddleware, controllerGetUserDetails);

// Get user permissions
usersRouter.get('/me/permissions', jwtAuthMiddleware, controllerGetUserPermissions);

// Signup route
usersRouter.post('/', controllerPostSignup);

export default usersRouter;