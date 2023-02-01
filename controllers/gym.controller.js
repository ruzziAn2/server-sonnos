import { Gym } from "../models/Gym.js";
import { User } from "../models/User.js";

export const getGym = async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await Gym.findById(id);
    if (!gym) return res.status(404).json({ error: "El gimnasio no existe" });
    return res.json({ name: gym.name });
  } catch (error) {
    res.status(500).json({ error: "error de servidor" });
  }
};

export const getGyms = async (req, res) => {
  try {
    const gyms = await Gym.find();

    res.json({ gyms });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const createGym = async (req, res) => {
  try {
    const { name, address } = req.body;

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }
    const gym = new Gym({
      name: name,
      address: address,
      manager: user._id,
    });
    await gym.save();
    res.status(201).json({ gym });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

export const deleteGym = async (req, res) => {
  try {
    const { id } = req.params;
    const gym = await Gym.findById(id);

    if (!gym) return res.status(404).json({ error: "no existe el gimnasio" });

    if (!gym.manager.equals(req._id))
      return res.status(401).json({ error: "no es tu gimnasio pa" });

    await gym.remove();
    return res.json({ gym });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const updateGym = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address } = req.body;

    const gym = await Gym.findById(id);

    if (!gym) return res.status(404).json({ error: "No existe el gimnasio" });
    if (!gym.manager.equals(req._id)) {
      return res.status(401).json({ error: "No le pertenece el gimnasio" });
    }
    gym.name = name;
    gym.address = address;

    await gym.save();

    return res.json({ gym });
  } catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
      return res.status(403).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "error de servidor" });
  }
};
