import bcrypt from "bcrypt";

const employees = [
	{
		name: "diego",
		lastName: "monsalve",
		username: "superuser",
		password: bcrypt.hashSync("123456", 10),
		isConfirm:true,
		role: ["superuser"],
	},
	{
		name: "admin",
		lastName: "admin",
		username: "admin",
		isConfirm:true,
		password: bcrypt.hashSync("123456", 10),
		role: ["admin"],
	},
	{
		name: "user1",
		lastName: "user user1",
		username: "user1",
		password: bcrypt.hashSync("123456", 10),
		role: ["compras", "logistica"],
	},
	{
		name: "user2",
		lastName: "user user2",
		username: "user2",
		password: bcrypt.hashSync("123456", 10),
		role: ["ventas", "contabilidad"],
	},
];

export default employees;
