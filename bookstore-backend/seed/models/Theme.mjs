import { DataTypes } from "sequelize";
import db from "../db.mjs";

const Theme = db.define("theme", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	isDeleted: DataTypes.BOOLEAN,
	isActive: DataTypes.BOOLEAN,
});

export default Theme;
