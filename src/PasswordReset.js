import { useState } from 'react';
import Popup from "./Popup";

const PasswordReset = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailInput, setEmailInput] = useState('');

    const openPopup = (e) => {
        e.preventDefault();
        setIsPopupOpen(true);
        setEmailInput(email);
    };

    const handleChange = e => {
        setEmail(e.target.value);
    }
    
    const closePopup = () => {
        setIsPopupOpen(false);
    };

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
                <form className="form" action="" onSubmit={openPopup}>
                    <div className="header">
                        <h1>Password Reset</h1>
                        <p>Please enter your email address to reset password.</p>
                    </div>
                    <div className="input-field">
                        <label htmlFor="reset-email">Email</label>
                        <input 
                            type="email" 
                            id="reset-email" 
                            placeholder="Enter email address" 
                            value={email}
                            onChange={handleChange}
                            required/>
                    </div>
                    <button className="form-button" id="reset-password-button" type="submit" >Proceed</button>
                </form>
            </div>
        </div>  
     );
}
 
export default PasswordReset;