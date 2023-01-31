import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    //alternativa de validacion buscando por email
    let user = await User.findOne({ email });
    if (user) throw { code: 11000 };

    user = new User({ email: email, password: password });
    await user.save();

    //Generar el token JWT

    return res.status(201).json({ ok: true });
  } catch (error) {
    console.log(error);
    //validando por defecto mongoose
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe ese usuario" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: "No existe ese usuario" });
    }
    const verifyPassword = user.comparePassword(password);
    if (!verifyPassword) {
      return res.status(403).json({ error: "Credenciales incorrectas" });
    }

    //Generar el token JWT
    const { token, expiresIn } = generateToken(user._id);
    generateRefreshToken(user.id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email });
  } catch (error) {
    res.status(500).json({ error: "error de servidor" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error de servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};
