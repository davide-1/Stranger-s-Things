import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import { Link } from 'react-router-dom';
// import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NewPostForm from "./components/NewPostForm";
import ListPost from "./components/ListPosts";
import MessageForm from './components/Message';
import EditPost from './components/EditPost';
import User from "./components/User"



function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
 
   
  return (
     <div className='app'>
           {/* <Navbar token={token} /> */}

           <nav className="navbar">
           <h1 className='nav-header'>Strangers Things</h1>
           {token ? (
        <Link to="/home">Home</Link>
        ) : null} 

        {!token ? (
        <Link to="/">Register or Login</Link>
        ) : null }

        {token ? (
        <Link to="/user">Profile</Link>
        ) : null }
        
        {token ? (
        <Link to="/listPosts">Post</Link>
        ) : null}   
       


        {token ? (  
         <Link to="/logout">Logout</Link>
        ) : null}     
      </nav>
         <Routes>
          <Route path='/' element={<Register setToken={setToken} />} />
          <Route path='/home' element={<Home token={token} setToken={setToken} />} />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/logout' element={<Logout setToken={setToken} />} />
          <Route path='/newPostform' element={<NewPostForm token={token} setToken={setToken} />} />
          <Route path='/listPosts' element={<ListPost token={token} setToken={setToken} />} />
          <Route path='/edit/:post_id' element={<EditPost token={token} setToken={setToken} />} />
          <Route path='/user' element={< User token={token} setToken={setToken} />} />
         </Routes>
     </div>
  )
}

export default App
