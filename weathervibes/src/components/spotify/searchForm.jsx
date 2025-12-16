import React from 'react';

const SearchForm = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div>
      <h2>Search Playlists</h2>
      <form onSubmit={onSearch}>
        <input
          type="text"
          placeholder="Sök efter playlist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
        <button type="submit" style={{ padding: "8px 16px", marginLeft: "8px" }}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;