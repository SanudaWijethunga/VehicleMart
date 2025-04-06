import '../NavBar/NavBar.css';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';

export default function NavBar() {
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (response) => {
        const decoded = jwtDecode(response.credential);
        setUser({
            name: decoded.name,
            email: decoded.email,
            picture: decoded.picture,
        });
        console.log("User Info:", decoded);
    };

    const handleLogout = () => {
        googleLogout();
        setUser(null);
    };

    return (
        <div className="nav">
            <ul>
                <li>Vehicle Mart</li>
                {user ? (
                    <li className="user-section">
                        <img 
                            src={user.picture} 
                            alt="Profile" 
                            className="profile-pic"
                            title={user.name}
                        />
                        <button onClick={handleLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <GoogleLogin
                            onSuccess={handleLoginSuccess}
                            onError={() => console.log("Login failed")}
                        />
                    </li>
                )}
            </ul>
        </div>
    );
}