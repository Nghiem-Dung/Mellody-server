const mongoose = require("mongoose");
const UserLikeSong = require("../../models/UserLikeSong");

const isSongLiked = async (UserID, SongID) => {
    try {
        return await UserLikeSong.findOne({
            UserID: mongoose.Types.ObjectId(UserID),
            SongID: mongoose.Types.ObjectId(SongID),
        });
    } catch (error) {
        throw new Error('Error checking liked song: ' + error.message);
    }
};


const saveLikedSong = async (UserID, SongID, Now) => {
    try {
        const LikedSong = new UserLikeSong({
            UserID,
            SongID,
            CreateAt: Now,
        });

        await LikedSong.save();
        return LikedSong;
    } catch (error) {
        throw new Error('Error saving liked song: ' + error.message);
    }
};

const getLikedSongService = async (UserID) => {
    try {
        const LikedSongList = await UserLikeSong.find({
            UserID: mongoose.Types.ObjectId(UserID),
        });
        const SongIDList = LikedSongList.map((doc) => doc.SongID);
        Songs.find({ _id: { $in: SongIDList } }, (err, songs) => {
            if (err) {
                throw new Error(err.message)
            } else {
                return songs
            }
        });
    } catch (error) {
        throw new Error(error.message)
    }
}

const dislikedSongService = async (UserID, SongID) => {
    try {
        const RemoveLikedSong = await UserLikeSong.findOneAndRemove({
            UserID: mongoose.Types.ObjectId(UserID),
            SongID: mongoose.Types.ObjectId(SongID)
        })
        return RemoveLikedSong
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    isSongLiked,
    saveLikedSong,
    getLikedSongService,
    dislikedSongService
};