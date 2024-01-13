import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db";

import { IClient } from "../types";

const Client = db.define<IClient>(
	"client",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: DataTypes.STRING,
		token: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
		isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
		isConfirm: DataTypes.BOOLEAN,
		image: DataTypes.BOOLEAN,
	},
	{
		scopes: {
			deletePassword: {
				attributes: {
					exclude: [
						"password",
						"token",
						"isAvailable",
						"createdAt",
						"updatedAt",
						"isDeleted",
						"isActive",
					],
				},
			},
		},
	},
);

Client.prototype.verifyPassword = function (password: string) {
	return bcrypt.compareSync(password, this.password);
};

export default Client;
