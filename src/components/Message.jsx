const COHORT_NAME = "2305-ftp-pt-web-pt";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

import React, { useState} from 'react'

export default function SendMessageComponent({ token, postId }) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: {
            content: content,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // Clear the content input
        setContent('');
      } else {
        setError('Send message failed.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="send-message">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}