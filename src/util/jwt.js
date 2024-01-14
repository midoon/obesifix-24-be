import {} from "dotenv";
import jwt from "jsonwebtoken";

const signJwt = (payload, expiresIn) => {
  const token = jwt.sign({ payload }, process.env.JWT_KEY, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });

  return token;
};

const verifyJwt = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error) {
    return {
      valid: false,
      expired: error.message === "jwt is expired or not eligible to use",
      decoded: null,
    };
  }
};

export { signJwt, verifyJwt };
