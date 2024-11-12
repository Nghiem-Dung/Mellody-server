const postRegisterService = require("../../service/auth/postRegister");

const postRegister = async (req, res) => {
  try {
    const user = await postRegisterService(req);
    return res.status(200).json({
      user
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = postRegister;
