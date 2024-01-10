import type { Model } from "sequelize";

interface Transaction extends Model {
	id: string;
}

export interface ITransaction extends Model {
	id: string;
	documentNumber: number;
	observations: string;
}

export interface IBill extends Transaction {
	typeTransaction: "fv";
	country: string;
	city: string;
	address: string;
	subTotal: number;
	totalTaxes: number;
	totalDiscount: number;
	bigTotal: number;
	status: keyof typeof STATUS;
}

export interface IPurchaseOrder extends Transaction {
	typeTransaction: "oc";
	status: keyof typeof STATUS | "enviada";
}

export interface IInventoryEntry extends Transaction {
	typeTransaction: "ei";
	subTotal: number;
	totalTaxes: number;
	totalDiscount: number;
	bigTotal: number;
	status: keyof typeof STATUS;
}

interface Item extends Model {
	productType: keyof typeof PRODUCT_TYPE;
	productId: string;
	name: string;
	author: string;
	quantity: number;
}

export interface IBillItem extends Item {	
	pricePerUnity: number;
	taxPerUnity: number;
	discountPerUnity: number;
	totalPrice: number;
	totalTaxes: number;
	totalDiscount: number;
	subTotal: number;
}

export interface IInventoryEntryItem extends Item {
	editorial: string;
	pricePerUnity: number;
	taxPerUnity: number;
	discountPerUnity: number;
	totalPrice: number;
	totalTaxes: number;
	totalDiscount: number;
	subTotal: number;
}

export interface IPurchaseOrderItem extends Item {
	editorial: string;
}

const STATUS = {
	finalizada: "finalizada",
	anulada: "anulada",
	suspendida: "suspendida",
	incompleta: "incompleta",
} as const;

const PRODUCT_TYPE = {
	lbr: "lbr",
	rpa: "rpa",
	ppl: "ppl",
	jgt: "jgt",
} as const;
