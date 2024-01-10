import { DataTypes } from "sequelize";
import db from "../db.mjs";

const Distributor = db.define("distributor", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	nit: {
		type: DataTypes.STRING(20),
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	editorial: DataTypes.STRING,
	address: DataTypes.STRING,
	phone: DataTypes.STRING,
	country: DataTypes.STRING,
	web: DataTypes.STRING,
	email: DataTypes.STRING,
	contact: DataTypes.STRING,
	isDeleted: DataTypes.BOOLEAN,
	isActive: DataTypes.BOOLEAN,
});

export default Distributor;
