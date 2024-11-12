const Songs = require("../../models/Songs");
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const jsmediatags = require('jsmediatags');
const cloudinary = require('cloudinary').v2;
const iconv = require('iconv-lite');
const getSongById = async (SongId) => {
    try {
        const song = await Songs.findById(SongId);
        return song;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getSongsByAuthor = async (authorId) => {
    try {
        const result = await Songs.find({ AuthorID: authorId });
        return result.map((song) => ({
            id: song._id,
            title: song.titleSong,
            artist: song.AuthorID,
            artwork: song.Thumbnail,
            url: song.url,
        }));
    } catch (error) {
        throw new Error(error.message); // Re-throw for controller to handle
    }
};

const processTrackInfo = async (file) => {
    const mp3Path = file.path;
    const originalnameBuffer = Buffer.from(file.originalname, "binary");
    const originalname = iconv.decode(originalnameBuffer, "utf-8");
    const thumbnailDir = "thumbnails";
    const thumbnailPath = path.join(thumbnailDir, `${originalname}.png`);
    if (!fs.existsSync(thumbnailDir)) {
        fs.mkdirSync(thumbnailDir);
    }

    return new Promise((resolve, reject) => {
        jsmediatags.read(mp3Path, {
            onSuccess: async (tag) => {
                const { artist, album, title, genre, picture } = tag.tags;
                const pictureData = Buffer.from(picture.data);

                // Resize and save the image, then upload to Cloudinary
                try {
                    await sharp(pictureData).resize(100, 100).toFile(thumbnailPath);

                    const cloudinaryResult = await cloudinary.uploader.upload(thumbnailPath);
                    fs.unlinkSync(thumbnailPath); // Remove local thumbnail file

                    // Create song document
                    const newSong = new Songs({
                        titleSong: title,
                        Thumbnail: cloudinaryResult.secure_url,
                        AuthorID: artist,
                        GenreID: genre,
                    });
                    resolve(newSong);
                } catch (error) {
                    reject(error);
                }
            },
            onError: (error) => reject(new Error("Error reading MP3 file: " + error.message)),
        });
    });
}

const uploadSongService = async ({ title, artist, thumbnail, genre }, file) => {
    const now = new Date();
    const mp3Path = file.path;

    try {
        const mp3Upload = await cloudinary.uploader.upload(mp3Path, {
            resource_type: "video",
            format: "mp3",
            public_id: title,
        });

        const newSong = new Songs({
            titleSong: title,
            Thumbnail: thumbnail,
            url: mp3Upload.secure_url,
            AuthorID: artist,
            GenreID: genre,
            CreateAt: now,
        });

        const savedSong = await newSong.save();
        return savedSong;
    } catch (error) {
        throw new Error(error.message);
    }
}

const searchSongService = async (SongName) => {
    try {
        const SearchingSong = await Songs.find({
            titleSong: { $regex: SongName, $options: 'i' },
        });
        return SearchingSong;
    } catch (err) {
        throw new Error('Error while searching for song');
    }
}

const getTopTracksService = async () => {
    try {
        const topTracks = await Songs.find()
            .sort({ listenCount: -1 })
            .limit(10)
            .select("titleSong listenCount url Thumbnail AuthorID GenreID");
        return topTracks;
    } catch (err) {
        throw new Error('Error while fetching top tracks');
    }
};

module.exports = {
    getSongById,
    getSongsByAuthor,
    processTrackInfo,
    uploadSongService,
    searchSongService,
    getTopTracksService
};