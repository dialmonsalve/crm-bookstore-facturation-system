import express, { Router } from "express";
import { client } from "../controllers";
import { protectPath } from "../middleware/validateJWT";
import { isEmployee } from "../middleware/reqValidations";
import { check } from "express-validator";
import { validFields } from "../middleware/validFields";

const clientRoute = Router();

clientRoute.use(express.json());

clientRoute.post("/auth/login",[
	check("email", "Campo email es requerido").notEmpty(),
	check("email", "Campo debe ser un email válido").isEmail(),
	check("password", "Campo password es requerido").notEmpty(),
	validFields,
], client.authentication);

clientRoute.get("/clients", [protectPath, isEmployee], client.getAll);

export default clientRoute;