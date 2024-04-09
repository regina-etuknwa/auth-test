import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import OTPInput from "./OTPInput";
import Popup from "./Popup";
import SubmitButton from "./SubmitButton";


const ConfirmEmail = () => {
    const { token } = useParams();

    const [emailData, setEmailData] = useState('');
    const [otp, setOTP] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [resendOTPIsLoading, setResendOTPIsLoading] =useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [otpError, setOTPError] = useState(false);

    const link = <Link to="/auth-test/sign-in" >Login</Link>;

    useEffect(() => {
        const savedEmailData = localStorage.getItem('emailData');
        if(savedEmailData) {
            setEmailData(savedEmailData);
        }
    }, []);

    const saveOTP = (value) => {
        const otpString = value.join('');
        setOTP(otpString);
    }

    const openPopup = (e) => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleConfirmEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(otp);
        try {
            const response = await fetch('http://localhost:4000/api/Auth/emailconfirmation/' + token, {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ otp })
            });
            if(response.status === 200) {
                openPopup();
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch(error) {
            console.error('Error during email confirmation: ', error);
            setError('An unexpected error occured. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    const handleResendOTP = async () => {
        setResendOTPIsLoading(true);
        setOTPError(null);
        setSuccessMessage(null);

        try {
            const response = await fetch('http://localhost:4000/api/Auth/resendotp/' + emailData, {
                method: 'POST',
                headers: { "Content-Type": "application/json"}
            });
            console.log(response);
            if(response.status === 200) {
                setSuccessMessage('OTP resent successfully!')
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setOTPError('An error occurred while resending OTP. Please try again later.');
        } finally {
            setResendOTPIsLoading(false);
        }
    }

    return ( 
        <div>

            { isPopupOpen && <Popup onClose={closePopup} text='Email confirmed successfully. Proceed to ' link={link}  />}
            <div className="centralize">
                <form className="form" action="" onSubmit={handleConfirmEmail}>
                    <div className="header">
                        <h1>Confirm email</h1>
                        { error && <p className="error-text">{error}</p> }
                        <p>Enter code sent to {emailData} to confirm email.</p>
                    </div>
                    <OTPInput length={6} onOTPSave={saveOTP} />
                    <SubmitButton isLoading={isLoading} text="Proceed" />
                    <button type="button" className="resend-otp help-text" onClick={handleResendOTP} disabled={resendOTPIsLoading}>{resendOTPIsLoading ? 'Resending...' : 'Resend OTP'}</button>
                    {otpError && <p className="error-text">{otpError}</p> }
                    {successMessage && <p className="success-text">{successMessage}</p> }
                </form>
            </div>
        </div>
     );
}
 
export default ConfirmEmail;