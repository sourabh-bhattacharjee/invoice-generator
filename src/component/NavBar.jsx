import {useDispatch } from 'react-redux';
import {changeDisplayValue} from '../Redux/slices/dispBody'
import {  signOut } from "firebase/auth";
import { auth } from '../firebaseInit';

export default function NavBar({user}){
    
    const dispatch = useDispatch();
    
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully');
    } catch (error) {
      console.error("Error signing out: ", error);
      alert(error.message);
    }
  };
    return(
        
        <div className={`navBody}`}>
            <div className="appSec">
                <img className="iconImg" src="https://cdn-icons-png.flaticon.com/128/11521/11521864.png" alt="app-icon" />
                <h1 className="appName">Invoice Generator</h1>
            </div>
            {user? <> <img onClick={handleSignOut} className="loginIcon" src="https://cdn-icons-png.flaticon.com/128/1828/1828479.png" alt="login-icon"/>
            <span onClick={handleSignOut} className="navlogout">Log Out</span></>
            :<><img onClick={()=> {dispatch(changeDisplayValue('loginPage'))}} className="loginIcon" src="https://cdn-icons-png.flaticon.com/128/5509/5509636.png" alt="login-icon"/>
            <span onClick={()=> {dispatch(changeDisplayValue('loginPage'))}} className="navLogin">Login</span>
            <img onClick={()=> {dispatch(changeDisplayValue('signupPage'))}} className="signupIcon" src="https://cdn-icons-png.flaticon.com/128/15754/15754186.png" alt="signup-icon" />
            <span onClick={()=> {dispatch(changeDisplayValue('signupPage'))}} className="navSignup">Sign Up</span></>}
        </div>
        
    )
    
}