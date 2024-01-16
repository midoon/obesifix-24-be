import {} from "dotenv";
import axios from "axios";
import { findUserByUserId } from "../../service/auth_service.js";
import dictionaryToArray from "../../helper/dictionaryToArray.js";

const nutritionClassiification = (data) => {
  let status = "";
  if (data < 18.5) {
    status = "underweight";
  } else if (data >= 18.5 && data <= 24.9) {
    status = "normal";
  } else if (data >= 25 && data <= 29.9) {
    status = "overweight";
  } else if (data >= 30) {
    status = "obese";
  }

  return status;
};

const recomendationFood = async (req, res) => {
  try {
    const user = await findUserByUserId(req.params.userId);

    const weight = user.weight;
    const height_in_m = user.height / 100;

    const nutritionValue = weight / (height_in_m * height_in_m);
    const formatedNutritionValue = nutritionValue.toFixed(1);
    const parsedNutritionValue = parseFloat(formatedNutritionValue);

    const nutritionStatus = nutritionClassiification(parsedNutritionValue);
    const foodType = user.food_type;

    const dataRecomendation = {
      nutrition_status: nutritionStatus,
      food_type: foodType,
    };

    const mlURL = process.env.ML_BASE_URL;

    const recomendationResponse = await axios.post(
      `${mlURL}/recomendation`,
      dataRecomendation
    );

    const recomendationFoodList = recomendationResponse.data.food_list;

    const responseData = dictionaryToArray(recomendationFoodList);
    return res.status(200).send({
      status: true,
      statusCode: 200,
      food_list: responseData,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
};

export default recomendationFood;
