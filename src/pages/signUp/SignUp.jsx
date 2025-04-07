import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useState } from 'react';
import '../signUp/SignUp.css';
import SignUpImg from '../../assets/images/SignUpImg.png';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });

                const userInfo = await res.json();
                setUser({
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                });

                localStorage.setItem("user", JSON.stringify({
                    name: userInfo.name,
                    email: userInfo.email,
                    picture: userInfo.picture,
                }));

                console.log("User Info:", userInfo);
                navigate('/home');
            } catch (err) {
                console.error("Failed to fetch user info:", err);
            }
        },
        onError: () => {
            console.log("Login Failed");
        },
        flow: 'implicit',
    });

    return (
        <div className="container">
            <div className="text-content">
                <h1>Hi, Welcome to VehicleMart</h1>
                <button className='login-button' onClick={() => login()}>
                    Continue with your Google account
                </button>
            </div>
            <div className="color">
                <h1>VehicleMart</h1>
                <img src={SignUpImg} alt="car image" />
                <h3>Vehicle insights at your fingertips</h3>
            </div>
        </div>
    );
}
