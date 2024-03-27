import { useRef, useState } from 'react';

const OTPInput = ({ length }) => {

    const [otp, setOTP] = useState(new Array(length).fill(''));
    const inputsRef = useRef([]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if(index < length-1  && value !== ""){
            inputsRef.current[index+1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === 'Backspace' && index > 0 && otp[index] === ''){
            inputsRef.current[index-1].focus();
        }
    };

    const handleDisable = (index) => {
        if (inputsRef.current[index-1] === ''){
            return true;
        }
    }

    return ( 
        <div className="otp-input-group">
            {otp.map((value, index) => (
                <input 
                    key={index}
                    className="otp-input"
                    maxLength={1}
                    value={value}
                    type="text" 
                    onChange={e => handleChange(index, e.target.value)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    ref={(input) => (inputsRef.current[index] = input)}
                    disabled={handleDisable(index)}
                />
            ))}
        </div>
     );
}
 
export default OTPInput;