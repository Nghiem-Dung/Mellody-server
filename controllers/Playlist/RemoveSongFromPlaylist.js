const PlaylistSong = require("../../models/PlaylistSong");

module.exports.RemoveSongFromPlaylist = async (req, res) => {
    const { PlaylistID, SongID } = req.body;
    try {
        const playlistSongs = await RemoveSongFromPlaylistService(PlaylistID, SongID);
        res.status(200).send(playlistSongs)
    } catch (error) {
        return res.status(500).send(error);
    }
}