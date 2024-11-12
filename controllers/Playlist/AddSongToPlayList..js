
const { AddSongToPlaylistService } = require("../../service/Playlist/Add-song-to-playlist-service");

module.exports.AddSongToPlaylist = async (req, res) => {
  const { PlaylistID, SongID } = req.body;

  try {
    const addedSong = await AddSongToPlaylistService(PlaylistID, SongID);
    return res.status(200).send(addedSong);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};