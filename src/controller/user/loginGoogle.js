import { v4 } from "uuid";
import {
  deleteTokenByUserId,
  findUserByEmail,
  isUserExistInTokenTable,
  storeDataToken,
} from "../../service/auth_service.js";
import { signJwt } from "../../util/jwt.js";

const loginWithGoogle = async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
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

export default loginWithGoogle;
