import React, { useState } from "react";
import {changeDisplayValue} from '../Redux/slices/dispBody';
import {useDispatch } from 'react-redux';
import {toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from "../firebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";


export default function SignupPage(){
    const [isCloseClicked,setIsCloseClicked] = useState(false);
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    
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
    const textStyle = {
        color: (password.length > 7 && password.length <21) ? 'white' : 'red'
    };
    const textStylesec = {
        color: (/[A-Z]/.test(password) && /[a-z]/.test(password)) ? 'white' : 'red'
    };
    const textStyleThr = {
        color: (/[!@#$%^&*(),.?":{}|<>]/.test(password)) ? 'white' : 'red'
    };
    function handleRfrLogin(){
        dispatch(changeDisplayValue('loginPage'));
    }
    const validatedata = async (e) =>{
        e.preventDefault();
        if(userName.length === 0 || password.length === 0){
            if(userName.length === 0 && password.length === 0){
                toast.error('username and password empty', {
                    autoClose: 2000,
                  });    
                  return;
            }
            if(password.length === 0){
                toast.error('password empty', {
                    autoClose: 2000,
                  });    
                  return;
            }
            
                toast.error('username empty', {
                    autoClose: 2000,
                  });    
                  return;
            
            

        }
        if(password.length > 7 && password.length <21){
            if(/[A-Z]/.test(password) && /[a-z]/.test(password)){
                if(/[!@#$%^&*(),.?":{}|<>]/.test(password)){
                    try {
                        await createUserWithEmailAndPassword(auth, userName, password);
                        toast.success('User Created' ,{
                            autoClose:2000,
                        });
                        setUserName("");
                        setPassword("");
                        setTimeout(() => {
                            closeComponent(); 
                          }, 5000);

                      } catch (error) {
                        toast.error('Username already exist' ,{
                            autoClose:2000,
                        });
                        
                      }
                    
                }
                else{
                    toast.error('password should contain atleast a special character', {
                        autoClose: 2000,
                      });
                }
            }
            else if(/[!@#$%^&*(),.?":{}|<>]/.test(password)){
                toast.error('Password should contain atleast a small and a capital letter', {
                    autoClose: 2000,
                  });
            }
            else{
                toast.error('Password should contain atleast a small , a capital letter and a special character', {
                    autoClose: 2000,
                  });
            }
        }
        else if(/[A-Z]/.test(password) && /[a-z]/.test(password)){
            if(/[!@#$%^&*(),.?":{}|<>]/.test(password)){
                toast.error('Please enter valid password length', {
                    autoClose: 2000,
                  });
            }
            else{
                toast.error('Please enter valid password length and should contain atleast a special character', {
                    autoClose: 2000,
                  });
            }
        }
        else if(/[!@#$%^&*(),.?":{}|<>]/.test(password)){
            toast.error('Please enter valid password length and should contain atleast a small and a capital letter', {
                autoClose: 2000,
              });
        }
        else{
            toast.error('Please check the all conditions of your choosen password', {
                autoClose: 2000,
              });
        }

    }
    return(
        isCloseClicked? null:
        <div className="loginSignupContainer">
            <div className="close-online-drawer" onClick={closeComponent}>
                <img src="https://cdn-icons-png.flaticon.com/128/1828/1828778.png" alt="cross" />
            </div>
            <div className="defaultSpan">
                <span style={{color:"white"}}>Please do not use personal email address. For checking you can enter fake email names.</span>
                <span style={{color:"white"}}>you can use default usename and password. I have added in the login page</span>
            </div>
            <div className="signupMain">
                <div className="sgnupMainChild">Write invoices in record time!</div>
                <div className="sgnupContent">
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828643.png" alt="tick"  className="tickStyle"/>
                    <div>Try it free for 14 days</div>
                </div>
                <div className="sgnupContent">
                    <img src="https://cdn-icons-png.flaticon.com/128/1828/1828643.png" alt="tick"  className="tickStyle"/>
                    <div>No payment details required</div>
                </div>
                <div className="userNameInput">
                    <span>Enter your user name!</span>
                    <input type="text" required placeholder="your user name" value={userName} onChange={(event) => handleUserNameChange(event)}></input>
                </div>
                <div className="userNameInput passInput">
                    <span>Enter your password!</span>
                    <input type="password" required placeholder="your password" value={password} onChange={(event) => handlePassChange(event)}></input>
                </div>
                <div className="passRule">
                    <ul>
                        <li style={textStyle}>Password must be between 8 to 20 Characters</li>
                        <li style={textStylesec}>Password should contain atleast a small and a capital letter</li>
                        <li style={textStyleThr}>Password should contain a special Characters @ , # , & etc. </li>
                    </ul>
                </div>
                <button className="signupBtn" onClick={validatedata}>Sign Up</button>
                <span>Already have an account? please do </span> 
                <span className="rfrLogin" onClick={handleRfrLogin}>log in</span> 
            </div>
            <ToastContainer />
        </div>
    );
}