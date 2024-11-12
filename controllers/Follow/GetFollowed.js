const { GetFollowerService } = require("../../service/Follow/Get-follower-service");


module.exports.GetFollowed = async (req, res) => {
  const UserId = req.query.UserId;

  try {
    const followedUsers = await GetFollowerService(UserId);
    return res.status(200).send(followedUsers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
