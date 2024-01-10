import { DataTypes } from "sequelize";
import db from "../config/db";

import { IClothing } from "../types";

const Clothing = db.define<IClothing>("clothing", {
	typeProduct: {
		type: DataTypes.CHAR(3),
		defaultValue: "rpa",
	},
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
	size: {
		type: DataTypes.ENUM({
			values: [
				"0-2",
				"2-4",
				"4-8",
				"xxs",
				"xs",
				"s",
				"m",
				"l",
				"xl",
				"xxl",
				"xxxl",
			],
		}),
	},
	slug: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
	},
	tags: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
	},
	cost: {
		type: DataTypes.DECIMAL(2, 2),
		defaultValue: 0,
	},
	utility: {
		type: DataTypes.DECIMAL(2, 2),
		defaultValue: 0,
	},
	price: {
		type: DataTypes.DECIMAL(2, 2),
		defaultValue: 0,
	},
	discount: {
		type: DataTypes.DECIMAL(2, 2),
		defaultValue: 0,
	},
	stock: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	imageLinks: DataTypes.ARRAY(DataTypes.STRING),
	isDeleted: DataTypes.BOOLEAN,
	isActive: DataTypes.BOOLEAN,
});

export default Clothing;
