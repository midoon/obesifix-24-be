import {
  deleteTokenByUserId,
  isUserExistInTokenTable,
} from "../../service/auth_service.js";

const logout = async (req, res) => {
  try {
    const isLogedUser = await isUserExistInTokenTable(req.user.user_id);
    if (isLogedUser !== 1) throw new Error("Unauthorized");
    await deleteTokenByUserId(req.user.user_id);
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Success logout",
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
};

export default logout;
