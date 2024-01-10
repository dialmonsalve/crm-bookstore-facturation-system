import { DataTypes } from "sequelize";
import db from "../config/db";

import { IBill } from "../types";

const Bill = db.define<IBill>("bill", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	typeTransaction: {
		type: DataTypes.CHAR(3),
		defaultValue: "fv",
	},
	documentNumber: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
	},
	country: {
		type: DataTypes.STRING,
	},
	city: {
		type: DataTypes.STRING,
	},
	address: {
		type: DataTypes.STRING,
	},
	subTotal: {
		type: DataTypes.DECIMAL(2, 2),
		allowNull: false,
	},
	totalTaxes: {
		type: DataTypes.DECIMAL(2, 2),
		allowNull: false,
	},
	totalDiscount: {
		type: DataTypes.DECIMAL(2, 2),
		defaultValue: 0,
	},
	bigTotal: {
		type: DataTypes.DECIMAL(2, 2),
		allowNull: false,
	},
	status: DataTypes.ENUM({
		values: ["finalizada", "anulada", "suspendida", "incompleta"],
	}),
	observations: DataTypes.STRING,
});

export default Bill;
