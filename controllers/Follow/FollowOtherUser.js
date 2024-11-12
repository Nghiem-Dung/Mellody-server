
const { FollowOtherUserService } = require("../../service/Follow/Follow-other-user-service");

module.exports.FollowOtherUser = async (req, res) => {
  const { FollowUserId, FollowedUserId } = req.body;

  try {
    const followedUser = await FollowOtherUserService(FollowUserId, FollowedUserId);
    return res.status(200).json(followedUser);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
