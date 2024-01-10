import type { Request, Response, NextFunction } from "express";
import { Employee } from "../models";
import { AuthenticatedRequest } from "../types";

const isAdmin = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const { employee } = req;

	const admin = await Employee.findByPk(employee?.id);

	if (!req.employee) {
		return res.status(500).json({
			msg: "Algo salió mal, Quiere verificar el rol sin validar el token primero",
		});
	}

	if (!admin?.role.includes("admin") && !admin?.role.includes("superuser")) {
		return res
			.status(401)
			.json({ msg: "Usuario no autorizado para realizar esta acción" });
	}

	next();
};

const isValidUUID = (req: Request, res: Response, next: NextFunction) => {

	const { id } = req.params;

	const regex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

	if (!regex.test(id)) {
		return res.status(404).json({ msg: "El Usuario no existe" });
	}

	next();
};
export { isAdmin, isValidUUID};
