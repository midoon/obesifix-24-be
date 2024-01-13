import prismaClient from "../util/database.js";

const isEmailExist = async (email) => {
  const token = await prismaClient.user.count({
    where: {
      email: email,
    },
  });

  return token;
};

const storeDataRegisterUser = async (userData) => {
  return await prismaClient.user.create({
    data: userData,
  });
};

export { isEmailExist, storeDataRegisterUser };
