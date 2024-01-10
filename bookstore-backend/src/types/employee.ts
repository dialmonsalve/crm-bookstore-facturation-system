import type { Model } from "sequelize";
import { Request } from "express";
import { IClient } from "./client";

export interface IEmployee extends Model {
	id: string;
	name: string;
	lastName: string;
	email: string;
	username: string;
	password: string;
	token: null | string;
	isActive: boolean;
	phone: string;
	isDeleted: boolean;
	isConfirm: boolean;
	role: (keyof typeof ROLE)[];
	image?: string;
	updatedAt: string;
	createdAt: string;
	verifyPassword: (password: string) => boolean;
}

export interface AuthenticatedRequest extends Request {
	employee?: IEmployee;
	client?: IClient;
}

const ROLE = {
	admin: "admin",
	logistica: "logistica",
	ventas: "ventas",
	compras: "compras",
	contabilidad: "contabilidad",
	superuser: "superuser",
} as const;
