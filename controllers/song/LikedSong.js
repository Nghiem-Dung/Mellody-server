const mongoose = require("mongoose");
const UserLikeSong = require("../../models/UserLikeSong");
const likedSongService = require('../../service/song/likedSongService')
const Songs = require("../../models/Songs");

module.exports.LikedSong = async (req, res) => {
  const { UserID, SongID } = req.body;
  const Now = new Date();

  try {
    const UserLikedSong = await isSongLiked(UserID, SongID);

    if (UserLikedSong !== null) {
      return res.status(200).send({ msg: 'User liked this song before' });
    }

    const LikedSong = await likedSongService.saveLikedSong(UserID, SongID, Now);
    return res.status(200).send(LikedSong);

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports.getLikedSong = async (req, res) => {
  const UserID = req.query.UserID;
  try {
    const songs = await likedSongService.getLikedSongService(UserID);
    res.status(200).send(songs);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


module.exports.disLikedSong = async (req, res) => {
  const { UserID, SongID } = req.body;
  try {
    const removedLikdesong = await likedSongService.dislikedSongService(UserID, SongID);
    res.status(200).send(removedLikdesong);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}