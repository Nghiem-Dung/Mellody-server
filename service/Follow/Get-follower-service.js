const Follow = require("../../models/Follow");

const GetFollowerService = async (UserId) => {
    try {
        const followedUsers = await Follow.find({ FollowUserId: UserId }).populate({
            path: "FollowedUserId",
            select: "username role",
        });
        return followedUsers;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { GetFollowerService }