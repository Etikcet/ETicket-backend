const yup = require("yup");
const uuid = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepository = require("../repositories/userRepository");

const signUpSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8).max(15),
  name: yup.string().required(),
  userType: yup.string().required(),
  phoneNumber: yup.string().length(10).required(),
});

const logInSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(8).max(15),
});

function generateAccessToken(userObj) {
  return jwt.sign(userObj, process.env.TOKEN_SECRET, { expiresIn: "3600s" });
}

async function logInUser(username, password) {
  var res = null;
  try {
    await logInSchema.validate({ username: username, password: password });
  } catch (e) {
    throw Error("Error in validating the data");
  }
  try {
    res = await userRepository.getUser(username);
  } catch (err) {
    throw Error("Error occured while getting the user");
  }

  if (res?.rowCount === 0) {
    throw Error("User not found");
  }
  const user = res.rows[0];
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, user.password, async (err, isMatch) => {
      if (err) {
        reject(err);
      }
      if (isMatch) {
        const userObj = { ...user };
        delete userObj.password;
        resolve({
          message: "User succesfully logged in!",
          statusCode: 200,
          data: {
            user: { ...userObj },
            token: generateAccessToken({
              username: username,
              userType: userObj.user_type,
              ID: userObj.id,
            }),
          },
        });
      } else {
        reject("Passwords do not match!");
      }
    });
  });
}

async function signUpUser(userData) {
  const { username, password, name, userType, phoneNumber } = userData;

  var userExistance = null;

  try {
    await signUpSchema.validate({
      username: username,
      password: password,
      name: name,
      userType: userType,
      phoneNumber: phoneNumber,
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
                    phoneNumber,
                    userType: userType,
                  },
                  token: generateAccessToken({
                    username: username,
                    userType: userType,
                    ID: ID,
                  }),
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
