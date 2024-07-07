import React, { useState } from "react";
import {changeDisplayValue} from '../Redux/slices/dispBody';
import {useDispatch } from 'react-redux';
import { auth } from "../firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
import {toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage(){
    // const [loginSuccess , setLoginsuccess] = useState(false);
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
    const validatedata = async(e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, userName, password);
            toast.success('Logged in successfully' ,{
                autoClose:2000,
            });
            setUserName("");
            setPassword("");
            setTimeout(() => {
                closeComponent();               
            }, 5000);
            // setLoginsuccess(!loginSuccess);
          } catch (error) {
            toast.error('Please check username or password' ,{
                autoClose:2000,
            });
            
          }
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
            {/* {loginSuccess? <span className="successlogin">Successfully logged in! please close the window</span>:null} */}
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
            <div className="navDefault">
                <h3 style={{color:"white"}}>user name : 1234@gmail.com</h3>
                <h3 style={{color:"white"}}>password: Sou@7003</h3>
            </div>
            <ToastContainer/>
        </div>
    );
}