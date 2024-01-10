import { DataTypes } from "sequelize";
import db from "../db.mjs";

const PurchaseOrder = db.define(
	"purchase_order",
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		documentNumber: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
		},
		typeTransaction: {
			type: DataTypes.CHAR(3),
			defaultValue: "oc",
		},
		observations: DataTypes.STRING,
		status: DataTypes.ENUM({
			values: ["finalizada", "anulada", "suspendida", "incompleta", "enviada"],
		}),
	},
	{
		timestamps: true,
	},
);

export default PurchaseOrder;
