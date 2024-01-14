import { findUserByUserId } from "../../service/auth_service.js";

const getUser = async (req, res) => {
  try {
    const user = await findUserByUserId(req.params.userId);
    delete user.password;
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Success get user data",
      data: user,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
};

export default getUser;
