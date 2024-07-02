import React, { useState } from "react";
import {changeDisplayValue} from '../Redux/slices/dispBody';
import {useDispatch } from 'react-redux';

export default function LoginPage(){
    const [isCloseClicked,setIsCloseClicked] = useState(false);
    const dispatch = useDispatch();
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    function closeComponent(){
        setIsCloseClicked(!isCloseClicked);
        dispatch(changeDisplayValue('first'))
    }
    function handleUserNameChange(event){
        setUserName(event.target.value);
    }
    function handlePassChange(event){
        setPassword(event.target.value);
    }
    function validatedata(){

    }
    function handleRfrLogin(){
        dispatch(changeDisplayValue('signupPage'));
    }
    return(
        isCloseClicked? null:
        <div className="loginSignupContainer">
            <div className="close-online-drawer" onClick={closeComponent}>
                <img src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png" alt="cross" />
            </div>
            <div className="signupMain">
            <div className="sgnupMainChild">Please Login to continue!</div>
            <div className="userNameInput">
                    <span>Enter your user name!</span>
                    <input type="text" required placeholder="your user name" value={userName} onChange={(event) => handleUserNameChange(event)}></input>
                </div>
                <div className="userNameInput passInput">
                    <span>Enter your password!</span>
                    <input type="password" required placeholder="your password" value={password} onChange={(event) => handlePassChange(event)}></input>
                </div>
                <button className="signupBtn" onClick={validatedata}>Login</button>
                <span>Don't have an account? please </span> 
                <span className="rfrLogin" onClick={handleRfrLogin}>Sign up</span>
            </div>
        </div>
    );
}