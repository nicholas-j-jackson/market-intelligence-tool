import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { sessionService } from 'redux-react-session';

import './LoginScreen.css'

const AccountScreen = () => {  

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");

    useEffect(()=>{
        sessionService.loadSession().then(currentSession => {
          console.log(currentSession)
          axios.get('http://localhost:3001/api/users/id/'+currentSession)
            .then(res=> {
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setEmail(res.data.email);
                setUserName(res.data.username);
            })
            .catch(err=>console.log(err))
        })
        .catch(err => {
          console.log(err)
         
        })
      })

    return (
        <div class="container">
        <input type="checkbox" id="check"/>
        <div class="login form">
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>Email: {email}</p>
          <p>Username: {username}</p>
        </div>
      </div>
    );
}
export default AccountScreen;