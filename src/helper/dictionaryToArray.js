import stringSelector from "./stringSelector.js";

const dictionaryToArray = (data) => {
  const tempData = {
    name: "",
    image: "",
    calorie: 0,
    fat: "",
    carbohydrate: 0,
    protein: 0,
    keyword: "",
    food_category: "",
  };
  const objKey = Object.keys(data);
  let tempArr = [];
  const index = Object.keys(data.Calories).length;
  for (let i = 0; i < index; i++) {
    let tempObj = { ...tempData };
    tempObj.name = data.Name[i];
    tempObj.image = data.Images[i];
    tempObj.calorie = data.Calories[i];
    tempObj.fat = data.FatContent[i];
    tempObj.carbohydrate = data.CarbohydrateContent[i];
    tempObj.protein = data.ProteinContent[i];
    tempObj.keyword = data.Keywords[i];
    tempObj.food_category = data.FoodCategory[i];
    tempArr = [...tempArr, tempObj];
  }
  //  CHAR FILTERUBG
  stringSelector(tempArr);
  return tempArr;
};

export default dictionaryToArray;
