import React from 'react';

const EmbedPlayer = ({ embedUrl }) => {
  if (!embedUrl) return null;

  return (
    <div style={{ marginTop: "24px", backgroundColor: "lightblue", padding: "10px" }}>
      <h3>Embedded Player</h3>
      <p>Debug embeddad URL: {embedUrl}</p>
      <p>EmbedUrl state: {embedUrl ? "SET" : "NOT SET"}</p>
      <iframe
        src={embedUrl}
        width="100%"
        height="380"
        style={{ border: "1px solid red", borderRadius: "12px" }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      />
    </div>
  );
};

export default EmbedPlayer;