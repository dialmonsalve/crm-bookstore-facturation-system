import jwt from "jsonwebtoken";
import config from "./envConfig";

import bcrypt from "bcrypt";

interface Data {
	id: string;
	name: string;
	username?: string;
	email?: string;
}

const generateId = () =>
	Math.random().toString(32).substring(2) + Date.now().toString(32);

const generateJWT = (data: Data) =>
	jwt.sign(
		{ id: data.id, name: data.name, username: data.username },
		`${config.keyJwt}`,
		{
			expiresIn: "1d",
		},
	);

const hashPassword = async (password: string) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

export { generateId, generateJWT, hashPassword };
