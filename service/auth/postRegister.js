const User = require("../../models/users");

const postRegisterService = async (req) => {
  const { mail } = req.body;
  try {
    const userExists = await User.exists({ mail: mail.toLowerCase() });

    if (userExists) {
      throw new Error("User already exists");
    }
    const user = await User.create(req.body);
    await user.save();
    await user.generateAuthToken();
    return { user };
  } catch (error) {
    console.error(error);
    throw new Error(new Error(error.message));
  }
};

module.exports = postRegisterService;
