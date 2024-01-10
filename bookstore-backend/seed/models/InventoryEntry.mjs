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
			defaultValue: "ei",
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
	},
	{
		timestamps: true,
	},
);

export default PurchaseOrder;
