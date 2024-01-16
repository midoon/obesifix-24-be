const filterStr1 = (str) => {
  let tempStr = str;
  const newTempStr_1 = tempStr.replace("c", "");
  const newTempStr_2 = newTempStr_1.replace("(", "");
  const newTempStr_3 = newTempStr_2.replace(")", "");
  const tempRegex = new RegExp('"', "g");
  const finalTempStr_1 = newTempStr_3.replace(tempRegex, "");
  return finalTempStr_1;
};

const filterStr2 = (str) => {
  let tempStr = str;
  const tempRegex = new RegExp('"', "g");
  const finalTempStr_1 = tempStr.replace(tempRegex, "");
  return finalTempStr_1;
};

const stringSelector = (payloads) => {
  payloads.forEach((food, i) => {
    // FILTERING KEYWORD
    if (food.keyword[0] === "c") {
      food.keyword = filterStr1(food.keyword);
    } else {
      food.keyword = filterStr2(food.keyword);
    }
    // FILTERING IMAGE
    if (food.image[0] === "c") {
      const finalTempStr_1 = filterStr1(food.image);
      const arrStr = finalTempStr_1.split(", ");
      food.image = arrStr[0];
    } else {
      food.image = filterStr2(food.image);
    }
  });
};

export default stringSelector;
