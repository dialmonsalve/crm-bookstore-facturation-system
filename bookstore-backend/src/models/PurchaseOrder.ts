import { DataTypes } from "sequelize";
import db from "../config/db";

import { IPurchaseOrder } from "../types";

const PurchaseOrder = db.define<IPurchaseOrder>(
	"purchase_order",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		typeTransaction: {
			type: DataTypes.CHAR(3),
			defaultValue: "oc",
		},
		documentNumber: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		observations: DataTypes.STRING,
		status: DataTypes.ENUM({
			values: ["finalizada", "anulada", "suspendida", "incompleta", "enviada"],
		}),
	},
);

export default PurchaseOrder;
