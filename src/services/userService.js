const yup = require("yup");

const userRepository = require("../repositories/userRepository");

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.number().required().min(8).max(15),
  name: yup.string().email(),
  userType: yup.string().url(),
  phoneNumber: yup.string().length(10),
  dob: yup.date(),
  address: yup.string().required(),
});

const logInUser = (username, password) => {
  userRepository.getUser(username);
};

async function signUpUser(userData) {
  const { id, username, password, name, userType, phoneNumber, dob, address } =
    userData;

  return schema
    .isValid({
      username: username,
      password: password,
      name: name,
      userType: userType,
      phoneNumber: phoneNumber,
      dob: dob,
      address: address,
    })
    .then(async (value) => {
      if (value) {
        try {
          const user = await userRepository.addUser(userData);
          return user;
        } catch (e) {
          throw e;
        }
      } else {
        throw Error("Validation Error");
      }
    })
    .catch((err) => {
      throw err;
    });
}

module.exports = {
  logInUser,
  signUpUser,
};
