import { isUserExistInTokenTable } from "../../service/auth_service.js";
import { signJwt, verifyJwt } from "../../util/jwt.js";
import { refreshTokenValidation } from "../../validator/user_validator.js";

const refresfhToken = async (req, res) => {
  try {
    const { error, value } = refreshTokenValidation(req.body);
    if (error) throw new Error("Validation error");

    //verifikasi token dan decode
    const dataRefreshToken = verifyJwt(value.refresh_token);

    if (!dataRefreshToken.valid || dataRefreshToken.expired) {
      throw new Error("Unauthorized");
    }
    const userId = dataRefreshToken.decoded.payload.user_id;
    const email = dataRefreshToken.decoded.payload.email;

    //verivikasi apakah user telah login atau belum
    const isLoggedUser = await isUserExistInTokenTable(userId);

    if (isLoggedUser !== 1) throw new Error("Unauthorized");

    const dataAccessToken = {
      user_id: userId,
      email,
    };

    const accessToken = signJwt(dataAccessToken, "3d");

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Success refresh token",
      data: {
        access_token: accessToken,
      },
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
};

export default refresfhToken;
