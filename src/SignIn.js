import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Popup from "./Popup";
import SubmitButton from "./SubmitButton";

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ showPassword, setShowPassword] = useState(false);
    const history = useHistory();

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };


    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/Auth/login', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            

            if(response.status === 200) {
                if(data.token) {
                    localStorage.setItem('emailData', email);
                    openPopup();
                    history.push('/auth-test/home-page');
                    const tokenData = data.token;
                    localStorage.setItem('tokenData', tokenData);
                } else {
                    setError(data.message);
                }
            } else {
                console.log(data);
                setError(data.message);
            }
        } catch(error) {
            console.error('Error during login: ', error);
            setError('An unexpected error occured. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return ( 
        <div>
            { isPopupOpen && <Popup onClose={closePopup} text='Login successful!' />}
            <div className="centralize">
            <form className="form" action="" onSubmit={handleSignIn}>
                <h1>Login</h1>
                { error && <p className="error-text">{error}</p> }
                <div className="input-field">
                    <label htmlFor="login-email">Email</label>
                    <input 
                        type="email" 
                        id="login-email" 
                        placeholder="Enter email address" 
                        value={email}
                        onChange={e => {setEmail(e.target.value)}}
                        required
                        />
                </div>
                <div className="input-field">
                    <label htmlFor="login-password">Password</label>
                    <div className="password-toggle">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id="login-password" 
                            placeholder="Enter Password" 
                            value={password}
                            onChange={e => {setPassword(e.target.value)}}
                            required
                            />
                        <button type="button" className="toggle-password-visibility-btn" onClick={togglePasswordVisibility}>{showPassword ? 'HIDE' : 'SHOW'}</button>
                    </div>
                    <p className="help-text"> <Link to="/auth-test/password-reset">Forgot password?</Link></p>
                </div>
                <SubmitButton isLoading={isLoading} text="Login" />
                <small  className="form-text">Don't have an account? <Link to="/auth-test/">Sign up</Link></small>
            </form>
            
        </div>

        </div>
        
     );
}
 
export default SignIn;