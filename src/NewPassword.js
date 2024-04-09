import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Popup from "./Popup";
import SubmitButton from "./SubmitButton";

const NewPassword = () => {
    const { Email, Token } = useParams();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordParameter, setPasswordParameter] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [ showPassword, setShowPassword] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword] = useState(false);

    const queryParams = new URLSearchParams({
        Email: Email,
        Token: Token
    })

    const link = <Link to="/auth-test/sign-in" >Login</Link>;

    const handlePasswordChange = e => {
        setNewPassword(e.target.value);
        setPasswordsMatch(true);
    }
    
    const handleConfirmPasswordChange = e => {
        setConfirmNewPassword(e.target.value);
        setPasswordsMatch(true);
    }

    const openPopup = () => {
            setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleNewPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if(newPassword !== confirmNewPassword) {
                setPasswordsMatch(false);
                setError('Passwords do not match');
                return;
            }

            setPasswordsMatch(true);
            console.log(Email, Token);
            const response = await fetch(`http://localhost:4000/api/Auth/ResetPassword?${queryParams}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ newPassword })
            });
            
            if(response.status === 200) {
                openPopup();
                setPasswordParameter('');
            } else {
                const data = await response.json();
                setError(data.message);
                if(data.length) {
                    setPasswordParameter(data[0]['description']);
                }
            }
        } catch(error) {
            console.error('Error during password change: ', error);
            setError('An unexpected error occured. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <div>
            { isPopupOpen && <Popup onClose={closePopup} text='Password changed successfully. Proceed to ' link={link}  />}
            
            <div className="centralize">
            <form className="form" action="" onSubmit={handleNewPassword}>
                <div className="header">
                    <h1>Hello User</h1>
                    { error && <p className="error-text">{error}</p> }
                    <p>Please enter new password.</p>
                </div>
                <div className="input-field">
                    <label htmlFor="new-password">Password</label>
                    <div className="password-toggle">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            id="new-password" 
                            placeholder="Enter Password" 
                            value={newPassword}
                            onChange={handlePasswordChange}
                            required
                            />
                        <button type="button" className="toggle-password-visibility-btn" onClick={togglePasswordVisibility}>{showPassword ? 'HIDE' : 'SHOW'}</button>
                    </div>
                </div>
                <div className="input-field">
                    <label htmlFor="confirm-new-password">Confirm Password</label>
                    <div className="password-toggle">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirm-new-password" 
                            placeholder="Retype Password" 
                            value={confirmNewPassword}
                            onChange={handleConfirmPasswordChange}
                            required/>

                        <button type="button" className="toggle-password-visibility-btn" onClick={toggleConfirmPasswordVisibility}>{showConfirmPassword ? 'HIDE' : 'SHOW'}</button>
                    </div>
                </div>
                {!passwordsMatch && <p className="help-text password-error">*Passwords do not match</p>}
                {passwordParameter && <p className="help-text password-error">*{passwordParameter}</p>}
                <SubmitButton isLoading={isLoading} text="Proceed" />
            </form>
        </div>
        </div>
        
     );
}
 
export default NewPassword;