const { GetSongFromPlaylistService } = require("../../service/Playlist/Get-song-from-playlist-service");


module.exports.GetSongFromPlaylist = async (req, res) => {
  const playlistID = req.query.playlistID;
  try {
    const playlist = await GetSongFromPlaylistService(playlistID);
    return playlist;
  } catch (error) {
    res.status(500).send(error.message);
  }
};
