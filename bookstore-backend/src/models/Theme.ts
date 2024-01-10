import { DataTypes } from "sequelize";
import db from "../config/db";

import { ITheme } from "../types";

const Theme = db.define<ITheme>("theme", {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	isDeleted: DataTypes.BOOLEAN,
	isActive: DataTypes.BOOLEAN,
});

export default Theme;
