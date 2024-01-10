import type { Model } from "sequelize";

export interface IClient extends Model {
	id: string;
	name: string;
	lastName: string;
	email: string;
	password: string;
	token: null | string;
	isActive: boolean;
	phone: string;
	isDeleted: boolean;
	isConfirm: boolean;
	image?: string;
	updatedAt: string;
	createdAt: string;
	verifyPassword: (password: string) => boolean;
}