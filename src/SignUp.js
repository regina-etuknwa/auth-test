import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return ( 
        <div className="centralize">
            <form className="form" action="" onSubmit={handleSubmit}>
                <h1>Create an Account</h1>
                <div className="input-field">
                    <label htmlFor="signup-email">Email</label>
                    <input type="email" id="signup-email" placeholder="Enter email address" />
                </div>
                <div className="input-field">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" placeholder="Enter First Name" />
                </div>
                
                <div className="input-field">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" placeholder="Enter Last Name" />
                </div>
                <div className="input-field">
                    <label htmlFor="phone-number">Phone Number</label>
                    <input type="number" id="phone-number" placeholder="Enter Phone Number" />
                </div>
                <div className="input-field">
                    <label htmlFor="signup-password">Password</label>
                    <input type="password" id="signup-password" placeholder="Enter Password" />
                </div>
                <div className="input-field">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" placeholder="Retype Password" />
                </div>
                <button className="form-button" id="signup-button" type="submit">Sign Up</button>
                {/* add link */}
                <small className="form-text">Already have an account? <Link to="/sign-in">Sign in</Link></small>

            </form>
        </div>
        
        
     );
}
 
export default SignUp;