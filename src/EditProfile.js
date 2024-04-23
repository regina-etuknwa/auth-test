import { useState, useEffect } from "react";
import SubmitButton from "./SubmitButton";
import Popup from "./Popup";
import { useHistory } from "react-router-dom";

const EditProfile = () => {

    const [editProfileIsLoading, setEditProfileIsLoading] = useState(false);
    const [updatePasswordIsLoading, setUpdatePasswordIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [ showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [ showNewPassword, setShowNewPassword] = useState(false);
    const [userName, setUserName] = useState('');
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isChangePasswordPopupOpen, setIsChangePasswordPopupOpen] = useState(false);
    const [error, setError] = useState('');
    const [token, setToken] = useState('');
    const history = useHistory();

    useEffect(() => {
        const savedEmailData = localStorage.getItem('emailData');
        const savedToken = localStorage.getItem('tokenData');
        if(savedEmailData) {
            setUserName(savedEmailData);
        }
        if(savedToken) {
            setToken(savedToken);
        }
    }, []);

    const handlePhoneNumberChange = e => {
        if (isNaN(e.target.value)) return;
        setPhoneNumber(e.target.value);
    }

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    }

    const openEditProfilePopup = () => {
        setIsEditProfilePopupOpen(true);
    };

    const closeEditProfilePopup = () => {
        setIsEditProfilePopupOpen(false);
    };
    
    const openChangePasswordPopup = () => {
        setIsChangePasswordPopupOpen(true);
    };

    const closeChangePasswordPopup = () => {
        setIsChangePasswordPopupOpen(false);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setUpdatePasswordIsLoading(true);
        closeChangePasswordPopup();
        setError('');

        try {
            const response = await fetch('http://localhost:4000/api/Auth/changePassword', {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                
                body: JSON.stringify({ userName, currentPassword, newPassword })
            });
            const data = await response.json();
            if(data.isSuccessful) {
                openChangePasswordPopup();
            } else {
                if(data.message === 'Microsoft.AspNetCore.Identity.IdentityError') {
                    setError('Incorrect Password');
                } else {
                    setError('Password reset failed. Please change your new password and try again.');
                }
            }
        } catch(error) {
            console.error('Error during password change: ', error);
            setError('An unexpected error occured. Please try again.');
        } finally {
            setUpdatePasswordIsLoading(false);
        }
    }

    const handleEditProfile = async (e) => {
        e.preventDefault();
        setEditProfileIsLoading(true);
        closeEditProfilePopup();
        setError('');

        console.log(token);

        try {
            const formData = new FormData();
            formData.append('FirstName', firstName);
            formData.append('LastName', lastName);
            formData.append('PhoneNumber', phoneNumber);
            // formData.append('ProfilePicture', '');

            const response = await fetch(`http://localhost:4000/api/User/update`, {
                method: 'PUT',
                headers: { 
                    // "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if(data.isSuccessful) {
                history.push('/auth-test/home-page');
            } else {
                setError(data.message);
            }

        } catch(error) {
            console.error('Error during profile change: ', error);
            setError('An unexpected error occured. Please try again.');
        } finally {
            setEditProfileIsLoading(false);
        }
    }

    return ( 
        <div>
            { isChangePasswordPopupOpen && <Popup onClose={closeChangePasswordPopup} text='Password changed successfully!' />}
            { isEditProfilePopupOpen && <Popup onClose={closeEditProfilePopup} text='Changes saved successfully!' />}
            <div className="centralize vertical">
            <img src="" alt="Avatar" className="avatar mt-80" />
            <form action="" className="edit-profile-form" onSubmit={handleEditProfile}>
                <div className="form-row">
                <div className="input-field form-row-item">
                    <label htmlFor="edit-profile-first-name">First Name</label>
                    <input 
                    type="text" 
                    id="edit-profile-first-name" 
                    placeholder="Enter First Name"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName} 
                    required
                    />
                </div>
                
                <div className="input-field form-row-item">
                    <label htmlFor="edit-profile-last-name">Last Name</label>
                    <input 
                    type="text" 
                    id="edit-profile-last-name" 
                    placeholder="Enter Last Name" 
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    required
                    />
                </div>
                </div>
                <div className="form-row">
                    <div className="input-field form-row-item">
                        <label htmlFor="edit-profile-email">Email</label>
                        <input 
                            type="email" 
                            id="edit-profile-email" 
                            placeholder="Enter email address" 
                            value={email}
                            onChange={e => {setEmail(e.target.value)}}
                            required
                            />
                    </div>
                    <div className="input-field form-row-item">
                        <label htmlFor="eidt-profile-phone-number">Phone Number</label>
                        <input 
                        type="text" 
                        id="eidt-profile-phone-number" 
                        placeholder="Enter Phone Number" 
                        onChange={handlePhoneNumberChange}
                        value={phoneNumber}
                        required/>
                    </div>
                </div>
                <SubmitButton isLoading={editProfileIsLoading} text="Save changes" />
            </form>

            { error && <p className="error-text">{error}</p> }
            <form action="" className="edit-profile-form" onSubmit={handleChangePassword}>
                <div className="form-row">
                    <div className="input-field form-row-item">
                        <label htmlFor="edit-profile-old-password">Old Password</label>
                        <div className="password-toggle">
                            <input 
                                type={showCurrentPassword ? 'text' : 'password'}
                                id="edit-profile-old-password" 
                                placeholder="Enter Current Password" 
                                value={currentPassword}
                                onChange={e => setCurrentPassword(e.target.value)}
                                required
                                />
                            <button type="button" className="toggle-password-visibility-btn" onClick={toggleCurrentPasswordVisibility}>{showCurrentPassword ? 'HIDE' : 'SHOW'}</button>
                        </div>
                    </div>
                    <div className="input-field form-row-item">
                        <label htmlFor="edit-profile-new-password">New Password</label>
                        <div className="password-toggle">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                id="edit-profile-new-password" 
                                placeholder="Enter New Password" 
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                required/>
                            <button type="button" className="toggle-password-visibility-btn" onClick={toggleNewPasswordVisibility}>{showNewPassword ? 'HIDE' : 'SHOW'}</button>
                        </div>
                    </div>
                </div>
                <SubmitButton isLoading={updatePasswordIsLoading} text="Update password" />
            </form>
        </div>
            
        </div>
        
     );
}
 
export default EditProfile;