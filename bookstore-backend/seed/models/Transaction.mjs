import { DataTypes } from "sequelize";
import db from "../db.mjs";

const Transaction = db.define("transaction", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	// name: {
	// 	type: DataTypes.ENUM({
	// 		values: ["EI", "FV", "AJE", "AJS", "PR", "DV", "NC", "OC"],
	// 	}),
	// 	allowNull: false,
	// },
});

export default Transaction;
