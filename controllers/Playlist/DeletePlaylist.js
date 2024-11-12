const Playlist = require("../../models/Playlist");
const { default: DeletePlaylistService } = require("../../service/Playlist/Delete-playlist-service");


module.exports.DeletePlaylist = async (req, res) => {
  const { PlaylistID } = req.body;

  try {
    const deletedPlaylist = await DeletePlaylistService(PlaylistID);
    res.status(200).send(deletedPlaylist)
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

