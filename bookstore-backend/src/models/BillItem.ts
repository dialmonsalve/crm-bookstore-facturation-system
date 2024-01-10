import { DataTypes } from "sequelize";
import db from "../config/db";

import { IBillItem } from "../types";

const BillItem = db.define<IBillItem>("bill_item", {
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
	quantity: {
		type: DataTypes.DECIMAL(2, 2),
		allowNull: false,
	},
	pricePerUnity: {
		type: DataTypes.DECIMAL(2, 2),
		allowNull: false,
	},
	taxPerUnity: {
		type: DataTypes.DECIMAL(2, 2),
		allowNull: false,
	},
	discountPerUnity: {
		type: DataTypes.DECIMAL(2, 2),
		allowNull: false,
	},
	totalPrice: {
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
	subTotal: {
		type: DataTypes.DECIMAL(2, 2),
		defaultValue: 0,
	},
});

export default BillItem;
