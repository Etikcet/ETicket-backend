const yup = require("yup");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");

const userRepository = require("../repositories/userRepository");
const e = require("express");

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8).max(15),
  name: yup.string().required(),
  userType: yup.string().required(),
  phoneNumber: yup.string().length(10).required(),
  dob: yup.date().required(),
  address: yup.string().required(),
});

const logInUser = (username, password) => {
  userRepository.getUser(username);
};

async function signUpUser(userData) {
  const { username, password, name, userType, phoneNumber, dob, address } =
    userData;

  var userExistance = null;

  try {
    await schema.validate({
      username: username,
      password: password,
      name: name,
      userType: userType,
      phoneNumber: phoneNumber,
      dob: dob,
      address: address,
    });
  } catch (error) {
    throw Error("Validation Error");
  }
  try {
    userExistance = await userRepository.getUser(username);
  } catch (e) {
    throw Error("Internal Server Error");
  }

  if (userExistance.rowCount === 0) {
    const ID = uuid.v4();
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, async (err, salt) => {
        if (err) {
          reject("Error in generating the salt");
        } else {
          return bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
              reject("Error in generating the password");
            }
            try {
              await userRepository.addUser({
                ...userData,
                ID: ID,
                password: hash,
              });
              resolve({
                data: {
                  user: {
                    ID: ID,
                    username: username,
                    name: name,
                    address: address,
                    phoneNumber,
                    dob: dob,
                    userType: userType,
                  },
                },
              });
            } catch (e) {
              reject(e);
            }
          });
        }
      });
    });
  } else {
    throw Error("User already exists");
  }
}

module.exports = {
  logInUser,
  signUpUser,
};
