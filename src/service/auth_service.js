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

const isUserExistInTokenTable = async (user_id) => {
  const user = await prismaClient.token.count({
    where: {
      user_id: user_id,
    },
  });
  return user;
};

const deleteTokenByUserId = async (user_id) => {
  return await prismaClient.token.delete({
    where: {
      user_id: user_id,
    },
  });
};

const storeDataToken = async (payload) => {
  return await prismaClient.token.create({
    data: payload,
  });
};

const findUserByEmail = async (email) => {
  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  return user;
};

const findUserByUserId = async (userId) => {
  const user = await prismaClient.user.findFirst({
    where: {
      user_id: userId,
    },
  });

  return user;
};
export {
  isEmailExist,
  storeDataRegisterUser,
  isUserExistInTokenTable,
  deleteTokenByUserId,
  storeDataToken,
  findUserByEmail,
  findUserByUserId,
};
