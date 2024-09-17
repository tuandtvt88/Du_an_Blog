import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "./Mycontext"; // Import context
import './Login.css'; // Import the CSS file

function Login() {
    const [usn, setUsn] = useState('');
    const [pwd, setPwd] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(MyContext); // Use setCurrentUser from context

    const getDataUsn = (event) => {
        setUsn(event.target.value);
    };

    const getDataPwd = (event) => {
        setPwd(event.target.value);
    };

    const submit = () => {
        // Send login request to backend to validate credentials
        axios.post('http://localhost:3000/login', { username: usn, password: pwd })
            .then(res => {
                if (res.data.success) {
                    setCurrentUser({ username: usn }); // Update currentUser context with the username
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/main');
                } else if (res.data.error === 'User not registered') {
                    setErrorMessage('Tài khoản bạn chưa đăng ký. Vui lòng đăng ký tài khoản mới.');
                } else {
                    setErrorMessage('Sai username hoặc password');
                }
            })
            .catch(err => {
                setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
            });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}
                <input type="text" placeholder="Username" value={usn} onChange={getDataUsn} />
                <input type="password" placeholder="Password" value={pwd} onChange={getDataPwd} />
                <button onClick={submit}>Submit</button>
                <p className="register-link">
                    Nếu bạn chưa có tài khoản, hãy <a href="/register">đăng ký tài khoản mới</a>.
                </p>
            </div>
        </div>
    );
}

export default Login;
