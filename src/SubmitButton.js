const SubmitButton = ({isLoading, text}) => {
    return ( 
        <button className="form-button" type="submit" disabled={isLoading}>{isLoading ? ( 
            <div className="spinner"></div> 
            ) : (
                text
            )}</button>
     );
}
 
export default SubmitButton;