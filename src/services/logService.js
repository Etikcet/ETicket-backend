const userRepository = require("../repositories/userRepository");

const logInUser = (username, password) => {
  userRepository.getUser(username);
};

const signUpUser = () => {};

module.exports = {
  logInUser,
  signUpUser,
};
