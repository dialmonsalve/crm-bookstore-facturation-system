import bcrypt from "bcrypt";

const clients = [
	{
		name: "user1",
		lastName: "user1 user1",
		password: bcrypt.hashSync("123456", 10),
		isConfirm: true,
		email: "user1@user.com",
	},
	{
		name: "user2",
		lastName: "user 2",
		password: bcrypt.hashSync("123456", 10),
		email: "user2@user.com",
	},
	{
		name: "user1",
		lastName: "user user1",
		password: bcrypt.hashSync("123456", 10),
		email: "user3@user.com",
	},
];

export default clients;
