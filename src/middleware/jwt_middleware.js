import { isUserExistInTokenTable } from "../service/auth_service.js";
import { verifyJwt } from "../util/jwt.js";

const authMiddelware = async (req, res, next) => {
  const headerApiToken = req.get("X-API-TOKEN");
  if (!headerApiToken) {
    return res.status(403).send({
      status: false,
      message: "Unauthorized",
    });
  }
  try {
    const access_token = headerApiToken.replace(/^Bearer\s/, "");
    const decodedValue = verifyJwt(access_token);
    if (!decodedValue.valid) throw new Error("Invalid token");
    if (decodedValue.expired) throw new Error("Token expired");
    req.user = decodedValue.decoded.payload;
    // mengecek apakah sudah login atau belum
    const countUser = await isUserExistInTokenTable(req.user.user_id);
    if (countUser !== 1) throw new Error("Unauthorized");
    return next();
  } catch (error) {
    return res.status(403).send({
      status: false,
      message: error.message,
    });
  }
};

export default authMiddelware;
