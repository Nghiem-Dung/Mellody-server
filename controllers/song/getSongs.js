const cloudinary = require("./cloudinary");
const User = require("../../models/users");
const Song = require("../../models/Songs");
const iconv = require("iconv-lite");
const jsmediatags = require("jsmediatags");
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const songService = require("../../service/song/songService");

module.exports.getSpecifySong = async (req, res) => {
  const { SongId } = req.query;
  try {
    const song = await songService.getSongById(SongId);
    if (!song) {
      return res.status(404).json({ message: "Can't find that song" });
    }

    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.getUploadedSongs = async (req, res) => {
  const { Author_Id } = req.body;
  try {
    const songs = await songService.getSongsByAuthor(Author_Id);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.getTrackInfo = async (req, res) => {
  try {
    const newSong = await songService.processTrackInfo(req.file);
    console.log(newSong)

    res.status(200).json(newSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports.uploadSong = async (req, res) => {
  try {
    const songData = {
      title: req.body.title,
      artist: req.body.artist,
      thumbnail: req.body.thumbnail,
      genre: req.body.genre,
    };

    const savedSong = await songService.uploadSongService(songData, req.file);
    res.status(200).json(savedSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports.SearchSong = async (req, res) => {
  const { SongName } = req.body;

  try {
    const SearchingSong = await songService.searchSongService(SongName);
    res.status(200).send(SearchingSong);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


module.exports.getTopTrack = async (req, res) => {
  try {
    const topTracks = await songService.getTopTracksService();
    return res.status(200).json(topTracks);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}