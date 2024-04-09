import { useState } from 'react';
import Popup from "./Popup";
import SubmitButton from './SubmitButton';


const PasswordReset = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
        setEmailInput(email);
    }; 
    
    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:4000/api/Auth/ForgotPassword', {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            if(response.status === 200) {
                openPopup();
            } else {
                console.log(data);
                setError(data.message);
            }
        } catch(error) {
            console.error('Error during password reset: ', error);
            setError('An unexpected error occured. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    function hideEmail(email) {
        const atIndex = email.indexOf('@');
        if (atIndex !== -1) {
          const visiblePart = email.substring(atIndex - 3); // Get last three characters and after "@" symbol
          const hiddenPart = email.substring(0, atIndex - 3).replace(/./g, '*'); // Hide characters before "@" except last three
          return hiddenPart + visiblePart;
        }
        return email; // If no "@" found
      }

    return ( 
        <div>
            { isPopupOpen && <Popup text="We sent a password reset link to " email={hideEmail(emailInput)} onClose={closePopup} /> }
            <div className="centralize">
                <form className="form" action="" onSubmit={handlePasswordReset}>
                    <div className="header">
                        <h1>Password Reset</h1>
                        { error && <p className="error-text">{error}</p> }
                        <p>Please enter your email address to reset password.</p>
                    </div>
                    <div className="input-field">
                        <label htmlFor="reset-email">Email</label>
                        <input 
                            type="email" 
                            id="reset-email" 
                            placeholder="Enter email address" 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required/>
                    </div>
                    <SubmitButton isLoading={isLoading} text="Proceed" />
                </form>
            </div>
        </div>  
     );
}
 
export default PasswordReset;