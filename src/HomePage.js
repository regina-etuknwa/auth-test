import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Popup from "./Popup";
import { jwtDecode } from 'jwt-decode';
import ActivityItem from "./ActivityItem";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [decodedToken, setDecodedToken] = useState('');
    const [id, setId] = useState('');
    const [ userData, setUserData] = ('');
    const [ loginCount, setLoginCount ] = useState('');
    const [ profilePicture, setProfilePicture ] = useState(null);
    const [ name, setName ] = useState('');
    const [activities, setActivities] = useState(["Updated profile picture", "Updated phone number", "Changed password"]);
    const history = useHistory();
    
    useEffect(() => {
        const token = localStorage.getItem('tokenData');
        if(token) {
            const decoded = jwtDecode(token)
            // setDecodedToken(decoded);
            setId(decoded.uid);
            const fetchData = async () => {
                // console.log("data fetched");
                try {
                    const response = await fetch(`http://localhost:4000/api/user/${decoded.uid}`);
                    const data = await response.json();
                    setName(data.data.firstName);
                    setLoginCount(data.data.loginCount);
                    setProfilePicture(data.data.profilePicture);


                    // add time stamps
                    const latestActivities = data.data.latestActivities.slice(-3);
                    const activitiesArray = [];
                    latestActivities.forEach(activity => {
                        activitiesArray.unshift(activity);
                    })
                    // console.log(latestActivities);
                    setActivities(activitiesArray);


                } catch (error) {
                    console.error('Error fetching the data: ', error);
                    setError('An unexpected error occured. Please try again later');
                }
            }
            fetchData();
        }
    }, []);


    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        history.push('/auth-test/sign-in');
        
        // console.log(decodedToken);
        console.log(id);


        // setIsLoading(true);
        // try {
        //     const response = await fetch(`http://localhost:4000/api/Auth/logout`);
            
        //     if(response.status === 200) {
        //         openPopup();
        //     } else {
        //         const data = await response.json();
        //         setError(data.message);
        //     }
        // } catch(error) {
        //     console.error('Error during logout: ', error);
        //     setError('An unexpected error occured. Please try again.');
        // } finally {
        //     setIsLoading(false);
        // }
    }

    return ( 
        <div>
            { isPopupOpen && <Popup onClose={closePopup} text='Logout successful!' />}
            <div className="centralize vertical">
                <section className="homepage-header">
                    <img src="" alt="Avatar" className="avatar" />
                    <h1>Welcome back {name} </h1>
                    <p>Login count: {loginCount}</p>
                    { error && <p className="error-text">{error}</p> }
                    <div className="homepage-btns">
                        <Link className="edit-profile-link" to="/auth-test/edit-profile">
                            <button type="button"  className="edit-profile-btn" >Edit Profile</button>
                        </Link>
                        <button onClick={handleLogout} className="form-button" type="button" disabled={isLoading}>
                            {isLoading ? ( <div className="spinner"></div> ) : ( "Logout" )}
                        </button>
                    </div>
                </section>
                <section className="user-activities">
                    <h2>Your recent activities will appear here</h2>
                    <ul className="activity-list">
                        {/* {activities.map((activity, index) => (
                            <li className="user-activity" key={index}>
                                <div className="activity">{activity}</div>    
                            </li>
                        ))} */}
                        {activities.map((activity, index) => (
                            <li className="user-activity" key={index}>
                                <ActivityItem activity={activity.activity} time={activity.timestamp} />
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
     );
}
 
export default HomePage;