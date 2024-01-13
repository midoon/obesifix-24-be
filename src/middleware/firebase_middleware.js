import firebaseAdminConfig from "../firebase/firebase_config.js";

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
    if (decodedValue) {
      req.user = decodedValue;
      return next();
    }
  } catch (error) {
    return res.status(403).send({
      status: false,
      message: "Unauthorized",
    });
  }
};

export default decodeTokenFirebase;
