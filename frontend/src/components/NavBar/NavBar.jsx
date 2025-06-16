import { useEffect, useState } from 'react';
import '../NavBar/NavBar.css';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            setUser(JSON.parse(loggedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/', { replace: true });
    };

    const login = () => {
        console.log('Login with Google');
    };

    return (
        <div className="nav">
            <ul>
                <li>VehicleMart</li>
                {user ? (
                    <div className="user-section">
                        <p>Welcome, {user.name}</p>
                        <img
                            src={user.picture}
                            alt="profile"
                            className="profile-pic"
                        />
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <button onClick={login}>
                        Login with your Google account
                    </button>
                )}
            </ul>
        </div>
    );
}