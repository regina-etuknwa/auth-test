import { Link } from "react-router-dom";

const SignIn = () => {
    return ( 
        <div className="centralize">
            <form className="form" action="">
                <h1>Login</h1>
                <div className="input-field">
                    <label htmlFor="login-email">Email</label>
                    <input type="email" id="login-email" placeholder="Enter email address" />
                </div>
                <div className="input-field">
                    <label htmlFor="login-password">Password</label>
                    <input type="password" id="login-password" placeholder="Enter Password" />
                    <p className="help-text"> <Link to="/password-reset">Forgot password?</Link></p>
                </div>
                <button className="form-button" id="login-button" type="submit">Login</button>
                <small  className="form-text">Don't have an account? <Link to="/">Sign up</Link></small>{/* add Link */}
            </form>
            
        </div>
     );
}
 
export default SignIn;