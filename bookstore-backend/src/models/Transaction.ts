import { DataTypes } from "sequelize";
import db from "../config/db";

import { ITransaction } from "../types";

const Transaction = db.define<ITransaction>("transaction", {
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
