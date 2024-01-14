import {} from "dotenv";
import { v4 } from "uuid";
import { registerUserValidation } from "../../validator/user_validator.js";
import {
  isEmailExist,
  storeDataRegisterUser,
} from "../../service/auth_service.js";
import { encode } from "../../util/hash.js";

const register = async (req, res) => {
  try {
    const { error, value } = registerUserValidation(req.body);
    if (error) throw new Error("Validation error");
    const userData = value;

    userData.user_id = v4().toString();
    userData.password = await encode(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    if (!userData.image) {
      userData.picture = process.env.DEFAULT_IMAGE_URL;
    }
    const existEmail = await isEmailExist(userData.email);
    if (existEmail !== 0) throw new Error("User already exist");

    await storeDataRegisterUser(userData);

    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: "Success register data",
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
};

export default register;
