const Playlist = require("../../models/Playlist");

const CreatePlaylistService = async (Body) => {
    try {
        const NewPlaylist = new Playlist({
            ...Body,
            CreatedAt: new Date(),
        });

        NewPlaylist.save((err, savedPlaylist) => {
            if (err) {
                throw new Error(err.message);
            } else {
                return savedPlaylist
            }
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { CreatePlaylistService };