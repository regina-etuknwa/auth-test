import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
    return ( 
        <div className="form centralize">
            <h2>Sorry</h2>
            <p>The page cannot be found.</p>
            <Link to="/auth-test/">Back to Sign Up...</Link>
        </div>
     );
}
 
export default NotFound;