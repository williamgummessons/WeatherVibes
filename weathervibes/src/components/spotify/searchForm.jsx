import React from 'react';

const SearchForm = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <div>
      <h2 className="h5">Sök spellistor</h2>
      <form onSubmit={onSearch} className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Sök efter playlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Sök</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;