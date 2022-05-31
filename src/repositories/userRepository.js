const pool = require("../config/database.conf");

async function getUser(username) {
  try {
    const res = await pool.query("SELECT * from users WHERE username = $1", [
      username,
    ]);
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function addUser(userData) {
  try {
    const res = await pool.query(
      "INSERT INTO users (ID,username,password,name,user_type,phone_number) values ($1,$2,$3,$4,$5,$6)",
      [
        userData.ID,
        userData.username,
        userData.password,
        userData.name,
        userData.userType,
        userData.phoneNumber,
      ]
    );
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

module.exports = {
  getUser,
  addUser,
};
