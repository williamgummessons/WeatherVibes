import React from 'react';

const EmbedPlayer = ({ embedUrl }) => {
  if (!embedUrl) return null;

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Embedded Player</h5>
        <p className="text-muted small">EmbedUrl: {embedUrl ? "SET" : "NOT SET"}</p>
        <div className="ratio ratio-16x9 mt-2" style={{ minHeight: 200 }}>
          <iframe
            src={embedUrl}
            title="Spotify Playlist"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
};

export default EmbedPlayer;