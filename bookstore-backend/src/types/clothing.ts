import type { Model } from "sequelize";

export interface IClothing extends Model {
	typeProduct: string;
	id: string;
	name: string;
	size: keyof typeof SIZE;
	slug: string[];
	tags: string[];
	cost: number;
	utility: number;
	price: number;
	discount: number;
	stock: number;
	imageLinks: string[];
	isDeleted: boolean;
	isActive: boolean;
}

const SIZE = {
	zeroTwo: "0-2",
	twoFour: "2-4",
	fourEight: "4-8",
	xxs: "xxs",
	xs: "xs",
	s: "s",
	m: "m",
	l: "l",
	xl: "xl",
	xxl: "xxl",
	xxxl: "xxxl",
} as const;
