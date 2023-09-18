import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home-container">
            <h1>Welcome to your friendly online Market</h1>
            <h3>Visit your Profile</h3>
            <Link to={`/user`}>
                  <button className="button-profile">View Profile</button>
                </Link>
           
        </div>

    )
    }

































