import type { Model } from "sequelize";

export interface IDistributor extends Model {
	id: string;
	nit: string;
	editorial: string;
	address: string;
	phone: string;
	country: string;
	web: string;
	email: string;
	contact: string;
	isDeleted: boolean;
	isActive: boolean;
}
