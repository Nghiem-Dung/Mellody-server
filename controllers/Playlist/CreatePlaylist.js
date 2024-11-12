const Playlist = require("../../models/Playlist");
const { CreatePlaylistService } = require("../../service/Playlist/Create-playlist-service");

module.exports.CreatePlaylist = async (req, res) => {
  try {
    const createdPlaylist = await CreatePlaylistService(req.body);
    res.status(200).send(createdPlaylist);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
