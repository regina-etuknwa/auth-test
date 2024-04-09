import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Popup from "./Popup";
import SubmitButton from "./SubmitButton";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordParameter, setPasswordParameter] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [ showPassword, setShowPassword] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword] = useState(false);

    
    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if(password !== confirmPassword) {
                setPasswordsMatch(false);
                setError('Passwords do not match');
                throw new Error(error);
            }

            const response = await fetch('http://localhost:4000/api/Auth/register', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email, firstName, lastName, phoneNumber, password})
            });
            const data = await response.json();
            if(data.isSuccessful) {
                console.log('Sign-up successful');
                openPopup();
                setPasswordParameter('');
            } else {
                setError(data.message);
                if(data.length) {
                    setPasswordParameter(data[0]['description']);
                } else {
                    window.scrollTo(0,0);
                }
                
            }
        } catch(error) {
            console.log('Error during sign-up: ', error);
            setError('An unexpected error occured. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const handlePhoneNumberChange = e => {
        if (isNaN(e.target.value)) return;
        setPhoneNumber(e.target.value);

    }

    const handleEmailChange =e => {
        setEmail(e.target.value);
        localStorage.setItem('emailData', e.target.value);
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return ( 
        <div>
            <div>
            { isPopupOpen && <Popup onClose={closePopup} text='Sign-up successful! Please confirm your email address.' />}
            <div className="centralize">
            <form className="form" action="" onSubmit={handleSignUp}>
                <h1>Create an Account</h1>
                { error && <p className="error-text">{error}</p> }
                <div className="input-field">
                    <label htmlFor="signup-email">Email</label>
                    <input 
                    type="email" 
                    id="signup-email" 
                    placeholder="Enter email address" 
                    onChange={handleEmailChange}
                    value={email}
                    required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="first-name">First Name</label>
                    <input 
                    type="text" 
                    id="first-name" 
                    placeholder="Enter First Name"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName} 
                    required
                    />
                </div>
                
                <div className="input-field">
                    <label htmlFor="last-name">Last Name</label>
                    <input 
                    type="text" 
                    id="last-name" 
                    placeholder="Enter Last Name" 
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="phone-number">Phone Number</label>
                    <input 
                    type="text" 
                    id="phone-number" 
                    placeholder="Enter Phone Number" 
                    onChange={handlePhoneNumberChange}
                    value={phoneNumber}
                    required/>
                </div>
                <div className="input-field">
                    <label htmlFor="signup-password">Password</label>
                    <div className="password-toggle">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id="signup-password" 
                            placeholder="Enter Password" 
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                                setPasswordsMatch(true);
                            } }
                            required
                            />
                        <button type="button" className="toggle-password-visibility-btn" onClick={togglePasswordVisibility}>{showPassword ? 'HIDE' : 'SHOW'}</button>
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <div className="password-toggle">
                        <input 
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-password" 
                            placeholder="Retype Password" 
                            onChange={e => {
                                setConfirmPassword(e.target.value)
                                setPasswordsMatch(true);
                            } }
                            value={confirmPassword}
                            required
                            />
                        <button type="button" className="toggle-password-visibility-btn" onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ? 'HIDE' : 'SHOW'}</button>
                    </div>
                </div>
                {!passwordsMatch && <p className="help-text password-error">*Passwords do not match</p>}
                {passwordParameter && <p className="help-text password-error">*{passwordParameter}</p>}
                <SubmitButton isLoading={isLoading} text="Sign Up" />
                <small className="form-text">Already have an account? <Link to="/auth-test/sign-in">Sign in</Link></small>

            </form>
            </div>
            </div>
        </div>
        
        
        // password@90A
     );
}
 
export default SignUp;