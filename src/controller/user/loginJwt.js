import { v4 } from "uuid";
import {
  deleteTokenByUserId,
  findUserByEmail,
  isEmailExist,
  isUserExistInTokenTable,
  storeDataToken,
} from "../../service/auth_service.js";
import { decode } from "../../util/hash.js";
import { signJwt } from "../../util/jwt.js";
import { loginUserValidation } from "../../validator/user_validator.js";

const login = async (req, res) => {
  try {
    const { error, value } = loginUserValidation(req.body);
    if (error) throw new Error("Validation error");
    const dataLogin = value;

    const isUserRegistered = await isEmailExist(dataLogin.email);
    if (isUserRegistered !== 1) throw new Error("email or password wrong");

    const user = await findUserByEmail(dataLogin.email);

    const validPassword = decode(dataLogin.password, user.password);
    if (!validPassword) throw new Error("email or password wrong");

    const dataToken = {
      user_id: user.user_id,
      email: user.email,
    };
    const accessToken = signJwt(dataToken, "3d");
    const refreshToken = signJwt(dataToken, "10d");

    const isLoggedUser = await isUserExistInTokenTable(user.user_id);
    if (isLoggedUser === 1) {
      await deleteTokenByUserId(user.user_id);
    }

    const dataTableToken = {
      token_id: v4().toString(),
      refresh_token: refreshToken,
      user_id: user.user_id,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await storeDataToken(dataTableToken);
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Success login",
      data: {
        userId: user.user_id,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
};

export default login;
