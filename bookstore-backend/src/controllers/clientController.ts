import type { Request, Response } from "express";
import { Client } from "../models";
import { generateJWT } from "../utils";

const authentication = async (req:Request, res:Response)=>{

	const { email , password } = req.body;

	const client = await Client.findOne({
		where: { email: email.toLowerCase() },
	});

	if (!client) {
		return res.status(400).json({ errors: [{ msg: "El usuario no existe" }] });
	}

	if (!client.verifyPassword(password)) {
		return res
			.status(400)
			.json({ errors: [{ msg: "Error en las credentials" }] });
	}

	const token = generateJWT({
		id: client.id,
		name: client.name,
		email: client.email.toLowerCase(),
	});

	return res
		.cookie("bearer_token", token, {
			httpOnly: true,
			secure: true,
		})
		.json({ msg: "Usuario autenticado exitosamente", error: false, token });

}

const getAll = async (req: Request, res: Response) => {

  const [client, total] = await Promise.all([
    Client.scope("deletePassword").findAll({
      where: {
        isDeleted: false
      }
    }),
    Client.count({
      where: {
        isDeleted: false
      }
    })]);

  const data = {
    total, client,
  }
  return res.json(data);
}

export { getAll, authentication }