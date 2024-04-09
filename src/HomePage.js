import { useState } from "react";
import SubmitButton from "./SubmitButton";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);

    return ( 
        <div className="centralize vertical">
            <section className="homepage-header">
                <img src="" alt="Avatar" className="avatar" />
                <h1>Welcome back {/*firstName*/} </h1>
                <p>Login count: {/*loginCount*/}</p>
                <div className="homepage-btns">
                    <button type="button" className="edit-profile-btn">Edit Profile</button>
                    <SubmitButton isLoading={isLoading} text="Logout" />
                </div>
            </section>
            <section className="user-activity">
                <h2>Your recent activities will appear here</h2>
                <ul>

                </ul>
            </section>
            

        </div>
     );
}
 
export default HomePage;