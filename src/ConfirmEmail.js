import { Link } from "react-router-dom";
import { useState } from "react";
import OTPInput from "./OTPInput";
import Popup from "./Popup";




const ConfirmEmail = () => {
    const [otp, setOTP] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [email, setEmail] = useState(null);
    const link = <Link to="/sign-in" >Login</Link>;

    const saveOTP = (value) => {
        setOTP(value);
    }

    const openPopup = (e) => {
        e.preventDefault();
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    return ( 
        <div>

            { isPopupOpen && <Popup onClose={closePopup} text='Email confirmed successfully. Proceed to ' link={link}  />}
            <div className="centralize">
                <form className="form" action="" onSubmit={openPopup}>
                    <div className="header">
                        <h1>Confirm email</h1>
                        <p>Enter code sent to {email} to confirm email.</p>
                    </div>
                    <OTPInput length={6} onOTPSave={saveOTP} />
                    <button className="form-button" id="reset-password-button" type="submit">Proceed</button>
                </form>
            </div>
        </div>
     );
}
 
export default ConfirmEmail;