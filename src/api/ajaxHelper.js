const COHORT_NAME = "2305-ftp-pt-web-pt";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`



export default function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("token");
  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
  }
 
  return headers;
}

export async function fetchAllPosts() {
  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      headers: getHeaders(),
    });
    const data = await res.json();

    return data.data.posts;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addPost(
  newTitle,
  newDescription,
  newPrice,
  newLocation,
  newWillDeliver
) {
  const sendData = {
    post: {
      title: newTitle,
      description: newDescription,
      price: newPrice,
      location: newLocation,
      willDeliver: newWillDeliver,
    },
  };

  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    throw error;
  }
}

export async function registerNewUser(newUserName, newPassword) {
  const sendData = {
    user: { username: newUserName, password: newPassword },
  };
  console.log(sendData);
  console.log(JSON.stringify(sendData));
  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    localStorage.setItem("auth_token", data.data.token);

    console.log(data);
  } catch (error) {
    throw error;
  }
}

export async function logIn(userUsername, userPassword) {
  const sendData = {
    user: { username: userUsername, password: userPassword },
  };
  console.log("LogIn Data" + sendData);
  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    localStorage.setItem("auth_token", data.data.token);

    console.log("Login Data" + data.data);
    console.log(getHeaders());
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: getHeaders(),
      method: "GET",
    });
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    throw error;
  }
}

// export async function deletePost(POST_ID) {
//   try {
//     const res = await fetch(`${BASE_URL}/posts/${POST_ID}`, {
//       method: "DELETE",
//       headers: getHeaders(),
//     });
//     const data = await res.json();
//     console.log(data.success);
//   } catch (error) {
//     throw error;
//   }
// }

export async function sendMessage(POST_ID, content) {
  try {
    const res = await fetch(`${BASE_URL}/posts/${POST_ID}/messages`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        message: {
          content: content,
        },
      }),
    });
    const data = await res.json();
    console.log(data)
    console.log(data.success);
  } catch (error) {
    console.log(error)
    throw error;
  }
}

export async function editPost(
  POST_ID,
  newTitle,
  newDescription,
  newPrice,
  newLocation,
  newWillDeliver,
  token
) {

  const sendData = {
    post: {
      title: newTitle,
      description: newDescription,
      price: newPrice,
      location: newLocation,
      willDeliver: newWillDeliver,
    },
  };

  try {
    const res = await fetch(`${BASE_URL}/posts/${POST_ID}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    console.log(data);
    return data.data.post;
  } catch (error) {
    console.log(error);
    return {};
  }
}
export async function fetchUserData() {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userData = await response.json();
    //   setUser(userData.data.user); // Update the user state with fetched data
    console.log(userData)
    } else {
      console.log("Failed to fetch user data");
    }
  } catch (error) {
    console.log("Error fetching user data:", error);
  }
}