import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { porfile } from "../controllers/user.controller.js";

const AuthRouters = Router();

AuthRouters.post("/signup", signUp);

AuthRouters.post("/login", login);

export default AuthRouters;
