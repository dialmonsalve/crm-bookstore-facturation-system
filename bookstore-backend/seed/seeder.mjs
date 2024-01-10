import { Employee, Client } from "./models/index.mjs";
import employees from "./data/employees.mjs";
import db from "./db.mjs";
import clients from "./data/clients.mjs";

const importData = async () => {
	try {
		await db.authenticate();

		await db.sync();

		await Promise.all([
			Employee.bulkCreate(employees),
			Client.bulkCreate(clients),
		]);

		console.log("Data inserts successfully");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const deleteData = async () => {
	try {
		await db.authenticate();

		await db.sync();

		// await Promise.all([
		// 	Employee.destroy({where:{}, truncate:true}),
		// ]);

		await db.sync({ force: true });

		console.log("Truncate Data successfully");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (process.argv[2] === "-i") {
	importData();
}
if (process.argv[2] === "-d") {
	deleteData();
}
