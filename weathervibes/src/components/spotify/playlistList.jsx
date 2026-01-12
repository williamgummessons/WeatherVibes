import React from 'react';

const PlaylistList = ({ playlists, onPlayPlaylist }) => {
  return (
    <div className="mt-3">
      {playlists?.filter((p) => p).map((playlist) => (
        <div key={playlist?.id} className="card mb-3">
          <div className="row g-0 align-items-center">
            <div className="col-auto p-3">
              {playlist?.images && playlist?.images[0] && (
                <img
                  src={playlist?.images[0]?.url}
                  alt="Playlist"
                  className="img-fluid rounded"
                  style={{ width: 120 }}
                />
              )}
            </div>
            <div className="col">
              <div className="card-body">
                <h5 className="card-title mb-1">{playlist?.name || "Unknown Playlist"}</h5>
                <p className="card-subtitle text-muted small mb-2">av {playlist?.owner?.display_name || "Unknown"} - {playlist?.tracks?.total || 0} tracks</p>
                <button onClick={() => onPlayPlaylist(playlist)} className="btn btn-primary btn-sm">Spela Spellista</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistList;