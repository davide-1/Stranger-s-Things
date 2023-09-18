const COHORT_NAME = "2305-ftp-pt-web-pt";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import "./searchBar.css";

export default function SearchBar({ setResult }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch(`${BASE_URL}/posts`)
      .then((response) => response.json())
      .then((json) => {
        // console.log("Response JSON:", json.data.players);

        if (Array.isArray(json.data.posts)) {
          const result = json.data.posts.filter((post) => {
            return (
              value &&
              post &&
              post.title &&
              post.title.toLowerCase().includes(value)
            );
          });
          console.log(result);
          setResult(result);
        } else {
          console.error("post data is not an array:", json.data.post);
          setResult([]); 
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setResult([]);
      });
  }

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  }

  return (
    <div className='input-wrapper'>
      <FaSearch id="search-icon" />
      <input
        className='input'
        placeholder='Type to search...'
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}

