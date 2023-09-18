

import React, { useState } from 'react';

export default function SearchResult({ result }) {
  const [selectedPost, setSelectedPost] = useState(null);

  const handleNameClick = () => {
    setSelectedPost(result);
  };

  return (
    <div className="search-result">
      <div onClick={handleNameClick}>{result.title}</div>
      {selectedPost && (
        <div className="player-info">
           <h3 className="post-title">{selectedPost.title}</h3>
           <p className="post-description">{selectedPost.description}</p>
           <p className="post-price">Price: {selectedPost.price}</p>
           <p className="post-seller">Seller: {selectedPost.author.username}</p>
           <p className="post-location">Location: {selectedPost.location}</p>
        </div>
      )}
    </div>
  );
}
