import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../db.mjs";

const Employee = db.define(
	"employee",
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
		email: DataTypes.STRING,
		username: {
			type: DataTypes.STRING(10),
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: DataTypes.STRING,
		token: DataTypes.STRING,
		isActive: DataTypes.BOOLEAN,
		isDeleted: DataTypes.BOOLEAN,
		isConfirm: DataTypes.BOOLEAN,
		image: DataTypes.BOOLEAN,
		role: {
			type: DataTypes.ARRAY(
				DataTypes.ENUM({
					values: [
						"admin",
						"superuser",
						"logistica",
						"ventas",
						"compras",
						"contabilidad",
					],
				}),
			),
			allowNull: false,
		},
	},
	{
		hooks: {
			// beforeCreate: async (user) => {
			// 	await validateUserFields(user);
			// },
		},
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

Employee.prototype.verifyPassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

export default Employee;
