const COHORT_NAME = "2305-ftp-pt-web-pt";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


import { useState, useEffect } from "react";
import {  fetchAllPosts } from "../api/ajaxHelper";
import NewPostForm from "./NewPostForm"
import Message from "./Message";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResultList";



export default function AllPost({ token, setToken }) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState("")
    const [postSuccessful, setPostSuccessful] = useState(false);
    const [result, setResult] = useState([])

    useEffect(() => {
        async function fetchUser() {
          try {
            const response = await fetch(`${BASE_URL}/users/me`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
    
            if (response.ok) {
              const userData = await response.json();
              setUser(userData.data);
            } else {
              console.log('Failed to fetch user data');
            }
          } catch (error) {
            console.log('Error fetching user data:', error);
          }
        }
    
        fetchUser();
      }, [token]);

    async function deletePost(POST_ID) {
        try {
         console.log(`${BASE_URL}/posts/${POST_ID}`)
            const response = await fetch(`${BASE_URL}/posts/${POST_ID}`, {
                method: "DELETE",
                headers: {  
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
            },
        });
        
        const result = await response.json();
        console.log(result);
        setPostSuccessful(!postSuccessful)
        } catch (error) {
            console.log(error)
            throw error;
        }
     }

     function isCurrentUserAuthor(post) {
        return user && post.author._id === user._id;
      }


     function renderAllPosts() {
        return posts.map((post) => {
            const canEditDelete = isCurrentUserAuthor(post);
            return (
                <div key={post._id} className="post-list">
                    <div className="post-item">
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-description">{post.description}</p>
                        <p className="post-price">Price: {post.price}</p>
                        <p className="post-seller">Seller: {post.author.username}</p>
                        <p className="post-location">Location: {post.location}</p>
                        {canEditDelete && (
              <div className="post-actions">
                <button
                  className="delete-button"
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </button>
                <Link to={`/edit/${post._id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
              </div>
            )}
                        <Message token={token} setToken={setToken} postId={post._id} />
                    </div>
                </div>
            )
        });
    }
    
    useEffect(() => {
        async function allPostHandler() {
            const returnPost = await fetchAllPosts();
            setPosts(returnPost)
        }
        allPostHandler();
    }, [postSuccessful]);
    
    return (
        <div>
            <NewPostForm
                token={token}
                setToken={setToken}
                postSuccessful={postSuccessful}
                setPostSuccessful={setPostSuccessful} /> 
            <SearchBar setResult={setResult} />  
            <SearchResult result={result} />
         {renderAllPosts()}
        </div>
    )
}