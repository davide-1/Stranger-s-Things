import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const COHORT_NAME = "2305-ftp-pt-web-pt";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default function MessageComponent({ token }) {
    const [userData, setUserData] = useState(null); 
    const { userId } = useParams(); 
  
    useEffect(() => {
      async function fetchUserData() {
        try {
          const response = await fetch(`${BASE_URL}/users/me`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (response.ok) {
            const userData = await response.json();
            setUserData(userData.data);
          } else {
            console.log('Failed to fetch user data');
          }
        } catch (error) {
          console.log('Error fetching user data:', error);
        }
      }
  
      fetchUserData();
    }, [token, userId]);
  
    // Render user-related data
    return (
      <div>
        {userData && (
          <div className="user-profile">
            <h2>Message from {userData.username}</h2>
          </div>
        )}
  
        
  {userData?.messages?.length > 0 && (
        <div className="user-messages">
          <h3>Messages:</h3>
          {userData.messages.map((message) => (
            <div key={message._id} className="message-item">
              <p>From: {message.fromUser.username}</p>
              <p>Message: {message.content}</p>
              <p>Related Post Title: {message.post.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>

  );
}