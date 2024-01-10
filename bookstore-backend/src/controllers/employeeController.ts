import type { Request, Response } from "express";

import { Employee } from "../models";

import { generateId, generateJWT, hashPassword } from "../utils";
import { AuthenticatedRequest } from "../types";
import { Op } from "sequelize";

const authentication = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	const employee = await Employee.findOne({
		where: { username: username.toLowerCase() },
	});

	if (!employee) {
		return res.status(400).json({ errors: [{ msg: "El usuario no existe" }] });
	}

	if (!employee.verifyPassword(password)) {
		return res
			.status(400)
			.json({ errors: [{ msg: "Error en las credentials" }] });
	}

	const token = generateJWT({
		id: employee.id,
		name: employee.name,
		username: employee.username.toLowerCase(),
	});

	return res
		.cookie("bearer_token", token, {
			httpOnly: true,
			secure: true,
		})
		.json({ msg: "Usuario autenticado exitosamente", error: false, token });
};

const create = async (req: AuthenticatedRequest, res: Response) => {
	const {
		name,
		lastName,
		username,
		email,
		password,
		role = [],
		phone,
		image,
	} = req.body;

	const hashPass = await hashPassword(password);

	try {
		const employee = await Employee.create({
			userType: "employee",
			name,
			lastName,
			username: username.toLowerCase(),
			email: email?.toLowerCase(),
			password: hashPass,
			role,
			token: generateId(),
		});

		const newEmployee = {
			id: employee.id,
			name,
			lastName,
			email: email?.toLowerCase(),
			username: username.toLowerCase(),
			phone,
			image,
			role,
		};

		const data = { msg: "Usuario creado correctamente", employee: newEmployee };
		return res.json(data);
	} catch (error) {
		console.log(error);

		return res.status(500).json({ msg: "verifique logs" });
	}
};

const getAll = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const [employees, total] = await Promise.all([
			Employee.scope("deletePassword").findAll({
				where: {
					isDeleted: false,
					role: {
						[Op.and]: [{ [Op.ne]: ["admin"] }, { [Op.ne]: ["superuser"] }],
					},
				},
			}),
			Employee.count({
				where: {
					isDeleted: false,
					role: {
						[Op.and]: [{ [Op.ne]: ["admin"] }, { [Op.ne]: ["superuser"] }],
					},
				},
			}),
		]);

		// where: { role: { [Op.contains]: ["compras"] } },

		const data = {
			total,
			employees,
		};
		return res.json(data);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "verifique logs" });
	}
};

const getOneById = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const employee = await Employee.scope("deletePassword").findByPk(id);

		if (!employee) {
			return res.status(404).json({ msg: "El Usuario no existe" });
		}

		return res.json(employee);
	} catch (error) {
		return res.status(500).json({ msg: "verifique logs" });
	}
};

const update = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, lastName, email, password, role, phone, image } = req.body;

	try {
		const employee = await Employee.scope("deletePassword").findByPk(id);

		if (!employee) {
			return res.status(404).json({ msg: "El Usuario no existe" });
		}

		if (employee.role.includes("admin")) {
			return res.status(403).json({
				msg: "Usuario admin no tiene permisos para actualizar este registro",
			});
		}
		const hashPass = await hashPassword(password);

		employee.set({
			name,
			lastName,
			email,
			password: hashPass,
			role,
			phone,
			image,
		});

		employee.save();

		const data = {
			msg: `usuario ${employee.username} ha sido actualizado correctamente`,
			id: employee.id,
		};
		return res.json(data);
	} catch (error) {
		return res.status(500).json({ msg: "verifique logs" });
	}
};

const remove = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const employee = await Employee.scope("deletePassword").findByPk(id);

		if (!employee) {
			return res.status(404).json({ msg: "El Usuario no existe" });
		}

		if (
			employee.role.includes("admin") ||
			employee.role.includes("superuser")
		) {
			return res.status(403).json({
				msg: "Usuario admin no tiene permisos para eliminar este registro",
			});
		}

		employee.isDeleted = true;

		await employee.save();

		return res.json({ msg: "Usuario eliminado satisfactoriamente" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "verifique logs" });
	}
};

const getEmployeesDeleted = async (req: Request, res: Response) => {
	try {
		const [employees, total] = await Promise.all([
			Employee.scope("deletePassword").findAll({
				where: {
					isDeleted: true,
				},
			}),
			Employee.count({
				where: {
					isDeleted: true,
				},
			}),
		]);

		const data = {
			total,
			employees,
		};

		return res.json(data);
	} catch (error) {
		console.log(error);

		return res.status(500).json({ msg: "verifique logs" });
	}
};

export {
	authentication,
	create,
	getAll,
	getOneById,
	update,
	remove,
	getEmployeesDeleted,
};
