import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error("No existe el token en el header, usa Bearer");

    token = token.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = payload.uid;

    next();
  } catch (error) {
    console.log(error.message);
    const TokenVerificationErrors = {
      "invalid signature": "La firma del JWT no es valida",
      "jwt expired": "JWT expirado",
      "invalid token": "Token no valido",
      "No Bearer": "Utiliza un formato Bearer",
      "jwt malformed": "JWT formato no válido",
    };
    return res
      .status(401)
      .send({ error: TokenVerificationErrors[error.message] });
  }
};
