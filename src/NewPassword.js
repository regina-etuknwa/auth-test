import { Link } from "react-router-dom";
import { useState } from "react";
import Popup from "./Popup";

const NewPassword = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const link = <Link to="/auth-test/sign-in" >Login</Link>;

    const handlePasswordChange = e => {
        setPass(e.target.value);
    }
    const handleConfirmPasswordChange = e => {
        setConfirmPass(e.target.value);
    }

    const openPopup = (e) => {
        e.preventDefault();
        if (pass === confirmPass){
            setPasswordsMatch(true);
            setIsPopupOpen(true);
        } else {
            setPasswordsMatch(false);
        }

        console.log(pass, confirmPass);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return ( 
        <div>
            { isPopupOpen && <Popup onClose={closePopup} text='Password changed successfully. Proceed to ' link={link}  />}
            
            <div className="centralize">
            <form className="form" action="" onSubmit={openPopup}>
                <div className="header">
                    <h1>Hello User</h1>
                    <p>Please enter new password.</p>
                </div>
                <div className="input-field">
                    <label htmlFor="new-password">Password</label>
                    <input 
                        type="password" 
                        id="new-password"
                        placeholder="Enter Password" 
                        value={pass}
                        onChange={handlePasswordChange}
                        required/>
                </div>
                <div className="input-field">
                    <label htmlFor="confirm-new-password">Confirm Password</label>
                    <input
                        type="password" 
                        id="confirm-new-password" 
                        placeholder="Retype Password" 
                        value={confirmPass}
                        onChange={handleConfirmPasswordChange}
                        required/>
                </div>
                {!passwordsMatch && <p className="help-text password-error">*Passwords do not match</p>}
                <button className="form-button" id="new-password-button" type="submit">Proceed</button>
            </form>
        </div>
        </div>
        
     );
}
 
export default NewPassword;