import firebaseAdminConfig from "../firebase/firebase_config.js";
import { isEmailExist } from "../service/auth_service.js";

const decodeTokenFirebase = async (req, res, next) => {
  const headerGoogleAuth = req.get("X-GOOGLE-API-KEY");
  if (!headerGoogleAuth) {
    return res.status(403).send({
      status: false,
      message: "Unauthorized",
    });
  }
  try {
    const decodedValue = await firebaseAdminConfig
      .auth()
      .verifyIdToken(headerGoogleAuth);
    req.user = decodedValue;
    const isRegisteredUser = await isEmailExist(req.user.email);
    // jika email user tidak ada di DB, maka tidak boleh login
    if (isRegisteredUser === 0) throw new Error("Unauthorized");
    return next();
  } catch (error) {
    return res.status(403).send({
      status: false,
      message: error.message,
    });
  }
};

export default decodeTokenFirebase;
