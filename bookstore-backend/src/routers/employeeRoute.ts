import express, { Router } from "express";
import {
	authentication,
	create,
	getAll,
	getOneById,
	update,
	remove,
	getEmployeesDeleted,
} from "../controllers";
import { protectPath } from "../middleware/validateJWT";
import { isAdmin, isValidUUID } from "../middleware/reqValidations";
import { validFields } from "../middleware/validFields";
import { check } from "express-validator";
import { usernameExists, isValidRole } from "../utils/dbValidations";

const employeeRout = Router();
employeeRout.use(express.json());

employeeRout.post("/auth/login", authentication);

employeeRout.post(
	"/admin/employees",
	[
		protectPath,
		isAdmin,
		check("name", "Campo nombre es requerido").notEmpty(),
		check("name", "Campo nombre debe tener al menos 3 caracteres").isLength({
			min: 3,
		}),
		check("name", "Campo nombre debe tener máximo 15 caracteres").isLength({
			max: 15,
		}),
		check("lastName", "Campo apellido es requerido").notEmpty(),
		check(
			"lastName",
			"Campo apellido debe tener al menos 3 caracteres",
		).isLength({
			min: 3,
		}),
		check(
			"lastName",
			"Campo apellido debe tener máximo 15 caracteres",
		).isLength({
			max: 15,
		}),
		check("username", "Campo username es requerido").notEmpty(),
		check(
			"username",
			"Campo username debe tener al menos 4 caracteres",
		).isLength({
			min: 4,
		}),
		check("username", "Campo username debe tener máximo 8 caracteres").isLength(
			{
				max: 8,
			},
		),
		check("username").custom(usernameExists),
		check("role", "Debe especificar al menos un rol")
			.isArray({ min: 1 })
			.custom(isValidRole),
		validFields,
	],
	create,
);

employeeRout.get(
	"/admin/employees",
	[protectPath, isAdmin, validFields],
	getAll,
);

employeeRout.get(
	"/admin/employees/:id",
	[protectPath, isAdmin, isValidUUID, validFields],
	getOneById,
);

employeeRout.patch(
	"/admin/employees/:id",
	[
		protectPath,
		isAdmin,
		isValidUUID,
		check("name", "Campo nombre es requerido").notEmpty(),
		check("name", "Campo nombre debe tener al menos 3 caracteres").isLength({
			min: 3,
		}),
		check("name", "Campo nombre debe tener máximo 15 caracteres").isLength({
			max: 15,
		}),
		check("lastName", "Campo apellido es requerido").notEmpty(),
		check(
			"lastName",
			"Campo apellido debe tener al menos 3 caracteres",
		).isLength({
			min: 3,
		}),
		check(
			"lastName",
			"Campo apellido debe tener máximo 15 caracteres",
		).isLength({
			max: 15,
		}),
		check("role", "Debe especificar al menos un rol")
			.isArray({ min: 1 })
			.custom(isValidRole),
		validFields,
	],
	update,
);

employeeRout.delete(
	"/admin/employees/:id",
	[protectPath, isAdmin, isValidUUID, validFields],
	remove,
);

employeeRout.get(
	"/admin/employees-deleted/",
	[protectPath, isAdmin, validFields],
	getEmployeesDeleted,
);

export default employeeRout;
