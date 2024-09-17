import { Field, Form, Formik } from "formik";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import {useState } from "react";

function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <>
            <h1>Register</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Show error message */}
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={values => {
                    axios.post('http://localhost:3000/register', values)
                        .then(res => {
                            alert('Đăng ký thành công');
                            navigate('/login');
                        })
                        .catch(err => {
                            if (err.response && err.response.status === 400) {
                                // Backend returns a 400 status code for duplicate registration
                                setErrorMessage('Tài khoản đã được đăng ký rồi, bạn hãy tạo tài khoản mới.');
                            } else {
                                setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại sau.');
                            }
                        });
                }}
            >
                <Form>
                    <Field name="username" placeholder="Username" />
                    <Field name="password" type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </>
    );
}

export default Register;
