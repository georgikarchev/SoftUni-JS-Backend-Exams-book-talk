const jwt = require("jsonwebtoken");
const User = require("../models/User");

const { JTW_SECRET } = require("../constants");

exports.login = async ({ email, password }) => {
  // find user in DB
  const user = await User.findOne({ email: email });

  // Check password match
  let isValid = await user.validatePassword(password);

  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  // create jwt and return it
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(payload, JTW_SECRET);

  return token;
};

exports.register = async ({ email, username, password }) => {
  let user = await User.findOne({ email }).lean();

  if (user) {
    throw new Error("User already exist.");
  }

  user = await User.create({ email: email, username: username, password: password });
  // !NB - Must be awaited, because it returns a Promise.
  // In order to have user._id in the token, the create function must be awaited.
  

  // create jwt and return it
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = jwt.sign(payload, JTW_SECRET);

  return token;
};