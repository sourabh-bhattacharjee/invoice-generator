export default function NavBar(){

    function handleRefresh(){
        window.location.reload(false);
    }
    return(
        <div className="navBody">
            <div className="appSec" onClick={handleRefresh}>
                <img className="iconImg" src="https://cdn-icons-png.flaticon.com/128/11521/11521864.png" alt="app-icon" />
                <h1 className="appName">Invoice Generator</h1>
            </div>
            <img className="loginIcon" src="https://cdn-icons-png.flaticon.com/128/5509/5509636.png" alt="login-icon"/>
            <span className="navLogin">Login</span>
            <img className="signupIcon" src="https://cdn-icons-png.flaticon.com/128/15754/15754186.png" alt="signup-icon" />
            <span className="navSignup">Sign Up</span>
        </div>
    )
    
}