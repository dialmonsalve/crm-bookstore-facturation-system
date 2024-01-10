import Employee from "./models/Employee.mjs";
import Bill from "./models/Bill.mjs";
import Book from "./models/Book.mjs";
import Product from "./models/Product.mjs";
import Theme from "./models/Theme.mjs";
import Transaction from "./models/Transaction.mjs";


// ! Relationship many to many between transactions and products
Transaction.belongsToMany(Product, {
	through: "transaction_product",
	foreignKey: "transactionId",
});

Product.belongsToMany(Transaction, {
	through: "transaction_product",
	foreignKey: "productId",
	otherKey: "transactionId",
});

// ! Relationship many to many between products and themes
Product.belongsToMany(Theme, {
	through: "product_theme",
	foreignKey: "productId",
});

Theme.belongsToMany(Product, {
	through: "product_theme",
	foreignKey: "themeId",
	otherKey: "productId",
});

// ! Relationship one to many between product and books
Book.belongsToMany(Product, {
	through: "book_product",
	foreignKey: "bookId",
});

// ! Relationship one to one between theme and user(Only employees)
Theme.belongsTo(User, { foreignKey: "userId" });

// ! Relationship one to one between transaction and user
Transaction.belongsTo(User, {foreignKey: "UserId", });

// ! Relationship one to one between facture and transaction
Bill.belongsTo(Transaction, { foreignKey: "transactionId" });

// ! Relationship one to many between product and books


export { Bill, Book, Transaction, Product, Theme, User };

