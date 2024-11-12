const Playlist = require("../../models/Playlist");

const GetPlaylistService = async (UserID) => {
    try {
        const playlist = await Playlist.find({ AuthorID: UserID });
        return playlist;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    GetPlaylistService,
};