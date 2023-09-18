
const COHORT_NAME = "2305-ftp-pt-web-pt";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/posts`;
import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";


export default function PostForm({token, setToken, postSuccessful, setPostSuccessful }) {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [willDeliver, setWillDeliver] = useState(false);
   const [error, setError] = useState('');
   const navigate = useNavigate();


   async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title,
            description,
            price,
            willDeliver
          },
        }),
      });

      if (response.ok) {
        
        const data = await response.json();
        // window.localStorage.setItem("token", data.data.token)
        // setToken(data.data.token);
        navigate("/listPosts")
        console.log(data);
        // return data;
        setPostSuccessful(!postSuccessful);
      } else {
        setError('Registration failed. Please check your input.');
      }
    } catch (error) {
        console.error('An error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  };
  
  return (
    <div className="create-post-form">
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br />
        <input 
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br />
        <input 
          type="text"
          placeholder="Will Deliver?"
          value={willDeliver}
          onChange={(e) => setWillDeliver(e.target.value)}
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br />
        <button type="submit">Create Post</button>
      </form>
      
    </div>
  );
}

