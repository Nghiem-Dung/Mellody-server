const Playlist = require("../../models/Playlist");
const PlaylistSong = require("../../models/PlaylistSong");
const Songs = require("../../models/Songs");

const AddSongToPlaylistService = async (PlaylistID, SongID) => {
    try {
        const playlist = await Playlist.findById(PlaylistID);
        const song = await Songs.findById(SongID);

        const playlistSong = new PlaylistSong({
            PlaylistID,
            SongID,
            CreatedAt: new Date(),
        });

        await playlistSong.save();

        return res.status(201).json({ message: "Song added to playlist successfully" });
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    AddSongToPlaylistService
}