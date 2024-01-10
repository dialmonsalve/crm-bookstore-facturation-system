import Bill from "./Bill.mjs";
import BillItem from "./BillItem.mjs";
import Book from "./Book.mjs";
import Client from "./Client.mjs";
import Clothing from "./Clothing.mjs";
import Distributor from "./Distributor.mjs";
import Employee from "./Employee.mjs";
import InventoryEntry from "./InventoryEntry.mjs";
import InventoryEntryItem from "./InventoryEntryItem.mjs";
import PurchaseOrder from "./PurchaseOrder.mjs";
import PurchaseOrderItem from "./PurchaseOrderItem.mjs";
import Theme from "./Theme.mjs";
import Transaction from "./Transaction.mjs";

// ! Relationship one to one between users and others models
Theme.belongsTo(Employee, { foreignKey: "employeeId" });
Book.belongsTo(Employee, { foreignKey: "employeeId" });
Clothing.belongsTo(Employee, { foreignKey: "employeeId" });
Distributor.belongsTo(Employee, { foreignKey: "employeeId" });
PurchaseOrder.belongsTo(Employee, { foreignKey: "employeeId" });
InventoryEntry.belongsTo(Employee, { foreignKey: "employeeId" });
Bill.belongsTo(Employee, { foreignKey: "employeeId" });

Bill.belongsTo(Client, { foreignKey: "clientId" });

// ! Relationship many to many between products and themes
Book.belongsToMany(Theme, {
	through: "book_theme",
	foreignKey: "bookId",
});

Theme.belongsToMany(Book, {
	through: "book_theme",
	foreignKey: "themeId",
	otherKey: "bookId",
});

// ! Relationship many to many between books and distributors
Book.belongsToMany(Distributor, {
	through: "book_distributor",
	foreignKey: "bookId",
});

Distributor.belongsToMany(Book, {
	through: "book_distributor",
	foreignKey: "distributorId",
	otherKey: "bookId",
});

// ! Relationship many to many between clothing and distributors
Clothing.belongsToMany(Distributor, {
	through: "clothing_distributor",
	foreignKey: "clothingId",
});

Distributor.belongsToMany(Clothing, {
	through: "clothing_distributor",
	foreignKey: "distributorId",
	otherKey: "clothingId",
});

// ! Relationship one to one between bill and transaction
InventoryEntry.belongsTo(Transaction, { foreignKey: "inventoryId" });
PurchaseOrder.belongsTo(Transaction, { foreignKey: "purchaseOrderId" });
Bill.belongsTo(Transaction, { foreignKey: "billId" });

// ! Relationship one to many between bill and billItems
BillItem.belongsToMany(Bill, {
	through: "billItem_bill",
	foreignKey: "billItemId",
});

// ! Relationship one to many between purchaseOder and purchaseOderItems
PurchaseOrderItem.belongsToMany(PurchaseOrder, {
	through: "purchaseOrderItem_purchaseOrder",
	foreignKey: "purchaseOrderItemId",
});

// ! Relationship one to many between InventoryEntry and InventoryEntryItems
InventoryEntryItem.belongsToMany(InventoryEntry, {
	through: "inventoryEntryItem_inventoryEntry",
	foreignKey: "inventoryEntryItemId",
});

export {
	Bill,
	BillItem,
	Book,
	Client,
	Clothing,
	Distributor,
	Employee,
	InventoryEntry,
	InventoryEntryItem,
	PurchaseOrder,
	PurchaseOrderItem,
	Theme,
	Transaction,
};
