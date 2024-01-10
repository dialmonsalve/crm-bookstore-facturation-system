import type { Model } from "sequelize";

export interface IBook extends Model {
	typeProduct: "lbr";
	id: string;
	ISBN: string;
	name: string;
	authors: string[];
	editorial: string;
	slug: string[];
	tags: string[];
	cost: number;
	utility: number;
	price: number;
	discount: number;
	stock: number;
	minStock: number;
	maxStock: number;
	imageLinks: string[];
	isDeleted: boolean;
	isActive: boolean;
	language: string[];
	publishedDate: string[];
	pageCount: number;
	format: keyof typeof FORMAT;
}

export interface ITheme extends Model {
	name: string;
	isDeleted: boolean;
	isActive: boolean;
}

const FORMAT = {
	admin: "admin",
	audiolibro: "audiolibro",
	impreso: "impreso",
	pdf: "pdf",
	epub: "epub",
	mobi: "mobi",
	cartone: "cartone",
} as const;
