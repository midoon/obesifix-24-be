import {} from "dotenv";
import axios from "axios";
import uploadImage from "../../util/uploadImage.js";

const getImageUrl = async (image) => {
  const imageUrl = await uploadImage(image);
  return imageUrl;
};

const predictFoodNutrition = async (req, res) => {
  try {
    if (!req.file) throw new Error("Gambar tidak ditemukan");
    const imageUrl = await getImageUrl(req.file);
    const mlUrl = process.env.ML_BASE_URL;
    const dataRequestToML = {
      image_url: imageUrl,
    };
    const classificationResponse = await axios.post(
      `${mlUrl}/prediction`,
      dataRequestToML
    );
    const foodNutritionData = classificationResponse.data.food_data;
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: "Success classify food image",
      food_data: foodNutritionData,
    });
  } catch (error) {
    return res.send({
      status: false,
      message: error.message,
    });
  }
};

export default predictFoodNutrition;
