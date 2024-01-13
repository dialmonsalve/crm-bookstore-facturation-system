import express, { Router } from "express";
import { employee } from "../controllers";
import { protectPath } from "../middleware/validateJWT";
import { isAdmin, isValidUUID } from "../middleware/reqValidations";
import { validFields } from "../middleware/validFields";
import { check } from "express-validator";
import { usernameExists, isValidRole } from "../utils/dbValidations";

const employeeRoute = Router();
employeeRoute.use(express.json());

employeeRoute.post("/admin/auth/login", [
	check("username", "Campo username es requerido").notEmpty(),
	check("password", "Campo password es requerido").notEmpty(),
	validFields,
],employee.authentication);

employeeRoute.post(
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
	employee.create,
);

employeeRoute.get(
	"/admin/employees",
	[protectPath, isAdmin, validFields],
	employee.getAll,
);

employeeRoute.get(
	"/admin/employees/:id",
	[protectPath, isAdmin, isValidUUID, validFields],
	employee.getOneById,
);

employeeRoute.patch(
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
	employee.update,
);

employeeRoute.delete(
	"/admin/employees/:id",
	[protectPath, isAdmin, isValidUUID, validFields],
	employee.remove,
);

employeeRoute.get(
	"/admin/employees-deleted/",
	[protectPath, isAdmin, validFields],
	employee.getEmployeesDeleted,
);

export default employeeRoute;
