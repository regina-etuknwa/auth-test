import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
    return ( 
        <div className="form centralize">
            <h2>Sorry</h2>
            <p>The page cannot be found. Explore our pages</p>
            <Link to="/auth-test/">Sign Up</Link>
            <Link to="/auth-test/sign-in">Sign In</Link>
            <Link to="/auth-test/password-reset">Password Reset</Link>
            {/* <Link to="/auth-test/new-password">New Password</Link> */}
            {/* <Link to="/auth-test/confirm-email">Confirm Email</Link> */}
        </div>
     );
}
 
export default NotFound;