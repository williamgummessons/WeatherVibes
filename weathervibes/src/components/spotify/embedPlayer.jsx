import React from 'react';

const EmbedPlayer = ({ embedUrl }) => {
  if (!embedUrl) return null;

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Vädermusikspelare</h5>
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