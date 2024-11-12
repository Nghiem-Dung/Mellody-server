const PlaylistSong = require("../../models/PlaylistSong");

const GetSongFromPlaylistService = async (playlistID) => {
    try {
        const result = await PlaylistSong.find({ PlaylistID: playlistID })
            .populate({
                path: 'PlaylistID',
                populate: { path: 'AuthorID' }
            })
            .populate({
                path: 'SongID',
                populate: { path: 'AuthorID' }
            })
            .exec();
        const playlistDetails = {
            PlaylistID: result[0].PlaylistID,
        };
        const songs = result.map(item => ({
            SongID: item.SongID,
        }));
        return { playlistDetails, songs }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { GetSongFromPlaylistService };