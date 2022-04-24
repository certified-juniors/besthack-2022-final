import React from "react";
import axios from 'axios';
import config from "../config"
import Balance from "./Balance";


const Profile = () => {
    const token = localStorage.getItem('token');

    return(
        <div>
            <Balance/>
        </div>
    )
}

export default Profile;