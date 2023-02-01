import { Client } from "../models/Client.js";
import { Gym } from "../models/Gym.js";

export const createClient = async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    console.log(req.params);
    const gym = await Gym.findById(id);
    if (!gym)
      return res.status(404).json({ error: "no se encontro el gimnasio" });
    const { name, email, phone, address } = req.body;
    const client = new Client({
      name,
      email,
      phone,
      address,
      gym: gym._id,
    });
    await client.save();
    res.status(201).json({ client });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client)
      return res.status(404).json({ error: "No se encontró el cliente" });
    return res.json({ client });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json({ clients });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.params);
    const client = await Client.findById(id);
    // console.log(client._id);
    if (!client)
      return res.status(404).json({ error: "no existe el gimnasio" });

    if (!client._id.equals(id))
      return res.status(401).json({ error: "no es tu usuario sorry" });

    await client.remove();
    return res.json({ client });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, email, phone } = req.body;

    const client = await Client.findById(id);

    if (!client) return res.status(404).json({ error: "No existe el cliente" });
    if (!client._id.equals(id)) {
      return res.status(401).json({ error: "No es el cliente" });
    }
    client.name = name;
    client.address = address;
    client.email = email;
    client.phone = phone;

    await client.save();
    return res.status(201).json({ client });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};
