const Follow = require("../../models/Follow");

const FollowOtherUserService = async (FollowUserId, FollowedUserId) => {
    try {
        const followed = await Follow.exists({
            FollowUserId: FollowUserId,
            FollowedUserId: FollowedUserId,
        });

        if (followed) {
            await Follow.deleteOne({
                FollowUserId: FollowUserId,
                FollowedUserId: FollowedUserId,
            });
        }

        const FollowOtherUser = new Follow({
            FollowUserId: FollowUserId,
            FollowedUserId: FollowedUserId,
            CreatedAt: new Date()
        });

        const savedFollow = await FollowOtherUser.save();
        return savedFollow;

    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { FollowOtherUserService };
