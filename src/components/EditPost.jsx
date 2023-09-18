import React, { useState, useEffect } from "react";
import { editPost } from "../api/ajaxHelper";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function EditPost({ token }) {
  const { post_id } = useParams(); 
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newWillDeliver, setNewWillDeliver] = useState(false);
  const navigate = useNavigate();

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    
    const updatedPost = await editPost(
      post_id, 
      newTitle,
      newDescription,
      newPrice,
      newLocation,
      newWillDeliver,
      token
    );


    
    if (updatedPost) {
      console.log("Post updated:", updatedPost);

      navigate("/listPosts");
      
    } else {
      console.log("Failed to update post.");
      
    }
  };


  return (
    <div className="edit-post">
      <h2>Edit Post</h2>
      <form onSubmit={handleEditSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </div>
        <div>
          <label>Will Deliver:</label>
          <input
            type="checkbox"
            checked={newWillDeliver}
            onChange={(e) => setNewWillDeliver(e.target.checked)}
          />
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
}
