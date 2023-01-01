const { Pool } = require("pg");
const { mapDBToModelSongs, mapDBToModelPlaylistGet } = require("./utils");

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(playlistId) {
    const queryGetPlaylistById = {
      text: "SELECT playlists.*, users.* FROM playlists LEFT JOIN users on users.id = playlists.owner WHERE playlists.id = $1",
      values: [playlistId],
    };

    const resultGetPlaylistById = await this._pool.query(queryGetPlaylistById);
    const playlistData = resultGetPlaylistById.rows.map(
      mapDBToModelPlaylistGet
    )[0];
    console.log("playlist data ", playlistData);
    const queryGetSongsByPlaylistId = {
      text: "SELECT songs.* FROM songs FULL OUTER JOIN playlist_songs ON songs.id=playlist_songs.song_id WHERE playlist_songs.playlist_id = $1",
      values: [playlistId],
    };

    const resultGetSongsByPlaylistId = await this._pool.query(
      queryGetSongsByPlaylistId
    );

    const songsData = resultGetSongsByPlaylistId.rows.map(mapDBToModelSongs);
    console.log("songs data", songsData);
    const data = {
      playlist: {
        ...playlistData,
        songs: songsData,
      },
    };

    console.log(data);
    return data;
    // return result.rows;
  }
}

module.exports = PlaylistsService;
