import { updateUserById } from "../../service/auth_service.js";
import { updateUserValidation } from "../../validator/user_validator.js";

const updateUser = async (req, res) => {
  try {
    const { error, value } = updateUserValidation(req.body);
    if (error) throw new Error("Validation error");
    if (req.user.user_id !== req.params.userId) throw new Error("Unauthorized");
    await updateUserById(req.params.userId, value);

    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Success update user",
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
};

export default updateUser;
