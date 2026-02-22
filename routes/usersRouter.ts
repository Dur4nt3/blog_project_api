import { Router } from "express";

import csrfCheckMiddleware from "../controllers/utilities/csrfCheckMiddleware";
import jwtAuthMiddleware from "../auth/jwtAuthMiddleware";

import { controllerGetUserPermissions, controllerGetUserDetails } from "../controllers/users/usersControllersGet";
import { controllerPostSignup } from "../controllers/users/usersControllersPost";

const usersRouter = Router();

// Get user info
usersRouter.get('/me', csrfCheckMiddleware, jwtAuthMiddleware, controllerGetUserDetails);

// Get user permissions
usersRouter.get('/me/permissions', csrfCheckMiddleware, jwtAuthMiddleware, controllerGetUserPermissions);

// Signup route
usersRouter.post('/', controllerPostSignup);

export default usersRouter;