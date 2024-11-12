
const { GetPlaylistService } = require("../../service/Playlist/Get-playlist");

module.exports.GetPlaylist = async (req, res) => {
  const UserID = req.query.UserID;
  try {
    const playlist = await GetPlaylistService(UserID);
    res.status(200).send(playlist);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
