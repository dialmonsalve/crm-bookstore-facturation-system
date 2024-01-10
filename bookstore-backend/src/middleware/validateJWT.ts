import type { Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { Employee } from "../models";

import config from "../utils/envConfig";
import { AuthenticatedRequest, IEmployee } from "../types";

export const protectPath = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	const { bearer_token } = req.cookies;
	

	if (!bearer_token) {
		return res.status(401).json({ msg: "No hay token en la petición" });
	}

	try {
		const decoded = jwt.verify(bearer_token, `${config.keyJwt}`) as IEmployee;
		const employee = await Employee.scope("deletePassword").findByPk(decoded.id);

		if (!employee) {
			return res.json({ authenticated: false, msg: "redirecting" });
		}
		req.employee = employee;

		next();
    
	} catch (error) {
		console.log(error);
		return res.status(401).json({
      msg: 'Token no valido'
    })
	}
};
