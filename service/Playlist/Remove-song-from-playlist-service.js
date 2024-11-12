const PlaylistSong = require("../../models/PlaylistSong");

const RemoveSongFromPlaylistService = async (PlaylistID, SongID) => {
    try {
        const playlistSongs = await PlaylistSong.findOneAndRemove({ PlaylistID: PlaylistID, SongID: SongID });
        return playlistSongs;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { RemoveSongFromPlaylistService };