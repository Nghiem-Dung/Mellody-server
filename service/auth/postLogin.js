const User = require("../../models/users");
const bcrypt = require("bcryptjs");
const postLoginService = async (req) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await user.generateAuthToken();
      user.token = token;
      const userObj = user.toObject();
      delete userObj.password;
      return { user: userObj };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = postLoginService;
