
const Playlist = require("../../models/Playlist");

const DeletePlaylistService = async (PlaylistID) => {
    try {
        const playlist = await Playlist.findById(PlaylistID);
        if (playlist) {
            await playlist.deleteOne();
            return "Deleted playlist";
        } else {
            throw new Error("No playlist found");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { DeletePlaylistService }