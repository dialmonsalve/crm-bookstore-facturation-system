import { Employee } from "../models";
import { ADMITTED_ROLES } from "./const";

const usernameExists = async (username = "") => {
	const employeeExists = await Employee.findOne({
		where: { username: username.toLowerCase() },
	});

	if (employeeExists) {
		throw new Error(`El username: ${username}, ya existe`);
	}
};

const isValidRole = async (role = []) => {
	const invalidRoles = role.filter((rol) => !ADMITTED_ROLES.includes(rol));

	const message =
		invalidRoles.length === 1
			? `El rol: ${invalidRoles} no es un rol válido`
			: `los roles: ${invalidRoles}, no son roles válidos`;

	if (invalidRoles.length > 0) {
		throw new Error(message);
	}
};

export { usernameExists, isValidRole };
