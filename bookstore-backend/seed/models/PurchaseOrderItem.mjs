import { DataTypes } from "sequelize";
import db from "../db.mjs";

const PurchaseOrderItem = db.define("purchase_order_item", {
	productType: {
		type: DataTypes.ENUM({
			values: ["lbr", "rpa", "ppl", "jgt"],
		}),
		allowNull: false,
	},
	productId: {
		type: DataTypes.UUID,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	author: DataTypes.STRING,
	editorial: DataTypes.STRING,
	quantity: {
		type: DataTypes.DECIMAL(2, 2),
		allowNull: false,
	},
});

export default PurchaseOrderItem;
