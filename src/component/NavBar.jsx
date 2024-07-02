import {useDispatch } from 'react-redux';
import {changeDisplayValue} from '../Redux/slices/dispBody'
// import { useSelector } from 'react-redux';
export default function NavBar(){
    //const selComp = useSelector((state) => state.displayMainBody.value);
    // let isShowFaded = (selComp ==='loginPage' || selComp ==='signupPage')? true: false;
    const dispatch = useDispatch();
    function handleRefresh(){
        window.location.reload(false);
    }
    return(
        <div className={`navBody}`}>
            <div className="appSec" onClick={handleRefresh}>
                <img className="iconImg" src="https://cdn-icons-png.flaticon.com/128/11521/11521864.png" alt="app-icon" />
                <h1 className="appName">Invoice Generator</h1>
            </div>
            <img onClick={()=> {dispatch(changeDisplayValue('loginPage'))}} className="loginIcon" src="https://cdn-icons-png.flaticon.com/128/5509/5509636.png" alt="login-icon"/>
            <span onClick={()=> {dispatch(changeDisplayValue('loginPage'))}} className="navLogin">Login</span>
            <img onClick={()=> {dispatch(changeDisplayValue('signupPage'))}} className="signupIcon" src="https://cdn-icons-png.flaticon.com/128/15754/15754186.png" alt="signup-icon" />
            <span onClick={()=> {dispatch(changeDisplayValue('signupPage'))}} className="navSignup">Sign Up</span>
        </div>
    )
    
}