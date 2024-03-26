
const SignUp = () => {
    return ( 
        <form action="" className="signup-form">
            <h1>Create an Account</h1>
            <div className="input-field">
                <label htmlFor="signup-email">Email</label>
                <input type="email" id="signup-email" placeholder="Enter email address" />
            </div>
            <div className="input-field">
                <label htmlFor="first-name">First Name</label>
                <input type="text"id="first-name" placeholder="Enter First Name" />
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
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter Password" />
            </div>
            <div className="input-field">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Retype Password" />
            </div>
            <button className="signup-button" type="submit">Sign Up</button>
            <div className="form-text">
                <small>Already have an account? Sign in </small>
            </div>

        </form>
     );
}
 
export default SignUp;