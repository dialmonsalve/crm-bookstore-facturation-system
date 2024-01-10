import { DataTypes } from "sequelize";
import db from "../db.mjs";

const Book = db.define("book", {
	typeProduct: {
		type: DataTypes.CHAR(3),
		defaultValue: "lbr",
	},
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	ISBN: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	authors: {
		type: DataTypes.ARRAY(DataTypes.STRING),
		allowNull: false,
		defaultValue: ["no definido"],
	},
	editorial: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "no definida",
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
	minStock: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	maxStock: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
	},
	imageLinks: DataTypes.ARRAY(DataTypes.STRING),
	isDeleted: DataTypes.BOOLEAN,
	isActive: DataTypes.BOOLEAN,
	language: DataTypes.STRING,
	publishedDate: DataTypes.STRING,
	pageCount: DataTypes.INTEGER,
	format: {
		type: DataTypes.ENUM({
			values: [
				"eBook",
				"audio libro",
				"impreso",
				"pdf",
				"epub",
				"mobi",
				"cartone",
			],
		}),
		defaultValue: "impreso",
	},
});

export default Book;
