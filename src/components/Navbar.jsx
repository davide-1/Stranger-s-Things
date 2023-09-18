

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div className="navbar">
//       <nav>
//             <Link to="/">Home</Link>
//             <Link to="/listPosts">All Post</Link>
//             <Link to="/newPostform">Posts Form</Link>
//             <Link to="/logout">Logout</Link>
//             <Link to="/">Home</Link>
//             <Link to="/register">Register</Link>
//             <Link to="/login">Login</Link>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = ({ token }) => {


//   console.log('Token inside navbar:', token)

//   return (
//     <div className="navbar">
//       <nav>
//         <Link to="/">Home</Link>
//         {!token ? (
//         <Link to="/register">Register</Link>
//         ) : null }

//         {!token ? (
//         <Link to="/login">Login</Link>
//         ) : null }
        
//         {token ? (
//         <Link to="/listPosts">All Post</Link>
//         ) : null}   

//         {token ? (
//         <Link to="/newPostform">Posts Form</Link>
//         ) : null}  

//         {token ? (  
//          <Link to="/logout">Logout</Link>
//         ) : null}     
//       </nav>
//     </div>
//   );
// };

// export default Navbar;