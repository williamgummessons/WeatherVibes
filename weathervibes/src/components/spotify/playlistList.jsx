import React from 'react';

const PlaylistList = ({ playlists, onPlayPlaylist }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {playlists?.filter(p => p).map((playlist) => (
        <div
          key={playlist?.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px"
          }}
        >
          <h4>{playlist?.name || "Unknown Playlist"}</h4>
          <p>by {playlist?.owner?.display_name || "Unknown"} - {playlist?.tracks?.total || 0} tracks</p>
          {playlist?.images && playlist?.images[0] && (
            <img
              src={playlist?.images[0]?.url}
              alt="Playlist"
              style={{ width: "150px", borderRadius: "4px" }}
            />
          )}
          <br />
          <button
            onClick={() => onPlayPlaylist(playlist)}
            style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}
          >
            Play Playlist
          </button>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;