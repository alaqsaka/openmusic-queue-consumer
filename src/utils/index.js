const mapDBToModelSongs = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

const mapDBToModelPlaylistGet = ({ id, name, username }) => ({
  id,
  name,
  username,
});

module.exports = {
  mapDBToModelPlaylistGet,
  mapDBToModelSongs,
};
