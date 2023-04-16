import React, { useEffect, useState, Fragment } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { sessionService } from 'redux-react-session';

import './LoginScreen.css'

const LoginScreen = () => {  
    const [logUsername, setLogUsername] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");

    const [userDoesNotExist, setUserDoesNotExist] = useState(false);
    const [invalidField, setInvalidField] = useState(false);
    const [duplicateUser, setDuplicateUser] = useState(false);
    
    const navigate = useNavigate();

    const onChangeUsername = e => {
        setNewUsername(e.target.value)

        if (duplicateUser) {
            setDuplicateUser(false);
        }
        if (invalidField) {
            setInvalidField(false);
        }

    }

    const onChangePassword = e => {
        setNewPassword(e.target.value)

        if (duplicateUser) {
            setDuplicateUser(false);
        }
        if (invalidField) {
            setInvalidField(false);
        }
    }

    const onChangeFirstName = e => {
        setNewFirstName(e.target.value)

        if (duplicateUser) {
            setDuplicateUser(false);
        }
        if (invalidField) {
            setInvalidField(false);
        }
    }

    const onChangeLastName = e => {
        setNewLastName(e.target.value)

        if (duplicateUser) {
            setDuplicateUser(false);
        }
        if (invalidField) {
            setInvalidField(false);
        }
    }

    const onChangeEmail = e => {
        setNewEmail(e.target.value)

        if (duplicateUser) {
            setDuplicateUser(false);
        }
        if (invalidField) {
            setInvalidField(false);
        }
    }

    const onChangeLogUsername = e => {
        setLogUsername(e.target.value)

        if (userDoesNotExist) {
            setUserDoesNotExist(false);
        }
    }

    const onChangeLogPassword = e => {
        setLogPassword(e.target.value)

        if (userDoesNotExist) {
            setUserDoesNotExist(false);
        }
    }

    const onSubmitSignup = e => {
        e.preventDefault();

        const user = {
            username: newUsername,
            password: newPassword,
            first_name: newFirstName,
            last_name: newLastName,
            email: newEmail
        }

        console.log(user);
        axios.post('http://localhost:3001/api/users/create', user, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.data.status === "duplicate_username_or_email") {
                setDuplicateUser(true);
            }
            else {
                window.location.reload(false);
            }
           
        })
        .catch(err => {
            console.log(err)
            setInvalidField(true);
        });
        
    }

    const onSumbitLogin = e => {
        e.preventDefault();
        
        const user = {
            username: logUsername,
            password: logPassword
        }

        axios.post('http://localhost:3001/api/users/login', user, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => {
            const {data} = res;
            console.log(data)
            if (data.status === "login_successful") {
                const userData = data.account_data;
                const token = userData._id;

                sessionService.saveSession(token)
                    .then(() => {
                        sessionService.saveUser(userData)
                            .then(() => {
                                navigate("/");
                                window.location.reload(false);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            } else {
                console.log("Failed Login.");

                setUserDoesNotExist(true);
            }
        })
        .catch(err => console.log(err));
    }

    

    return (
        <div class="container">
            <input type="checkbox" id="check"/>
            <div class="login form">
                <header>Login</header>
                <form action="#">

                    <input type="text" 
                    value={logUsername}
                    onChange={onChangeLogUsername}
                    placeholder="Enter your username"/>

                    <input type="password" 
                    value={logPassword}
                    onChange={onChangeLogPassword}
                    placeholder="Enter your password"/>

                    <input type="button" class="button" value="Login" onClick={onSumbitLogin}/>
                    { userDoesNotExist ?
                        <p className="text-danger" style={{textAlign:"center"}}>There is no user with the given credentials</p> :
                        null
                    }
                </form>
                <div class="signup">
                    <span class="signup">Don't have an account?
                        <label for="check">Signup</label>
                    </span>
                </div>
            </div>

            <div class="registration form">
                <header>Signup</header>
                <form action="#">
                    <input type="text" 
                    value={newUsername}
                    onChange={onChangeUsername}
                    placeholder="Create a username (at least 5 characters)"/>

                    <input type="text" 
                    value={newEmail}
                    onChange={onChangeEmail}
                    placeholder="Enter your email"/>

                    <input type="text" 
                    value={newFirstName}
                    onChange={onChangeFirstName}
                    placeholder="Enter your first name"/>

                    <input type="text" 
                    value={newLastName}
                    onChange={onChangeLastName}
                    placeholder="Enter your last name"/>

                    <input type="password" 
                    value={newPassword}
                    onChange={onChangePassword}
                    placeholder="Create a password (at least 8 characters)"/>

                    <input type="button" class="button" value="Signup" onClick={onSubmitSignup}/>
                    { invalidField ?
                        <p className="text-danger" style={{textAlign:"center"}}>One or more invalid fields</p> :
                        null
                    }
                    { duplicateUser ?
                        <p className="text-danger" style={{textAlign:"center"}}>User already exists with given email or username</p> :
                        null
                    }
                </form>
                <div class="signup">
                    <span class="signup">Already have an account?
                        <label for="check">Login</label>
                    </span>
                </div>  
            </div>
        </div>
        
    );
}
export default LoginScreen;