const postLoginService = require("../../service/auth/postLogin");

const postLogin = async (req, res) => {
  try {
    const user = await postLoginService(req);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = postLogin;
