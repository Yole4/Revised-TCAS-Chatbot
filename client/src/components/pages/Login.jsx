import React, { useState } from 'react';
import Header from './Header';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useEffect } from 'react';

function Login() {

    const { isLoading, setIsLoading, errorResponse, setErrorResponse,
        userLoginData, setUserLoginData, isLoginGoogle, setIsLoginGoogle,
        userRegisterData, setUserRegisterData, isRegisterGoogle, setIsRegisterGoogle,
        handleRegister, registerInfo, setRegisterInfo,
        loginInfo, setLoginInfo, handleLogin
    } = useContext(AuthContext);

    const [login, setLogin] = useState(true);
    const [isForgot, setIsForgot] = useState(false);
    const [register, setRegister] = useState(false);

    const [fafaEye, setFafaEye] = useState(false);
    const [fafaEyes, setFafaEyes] = useState(false);
    const [fafaEyess, setFafaEyess] = useState(false);

    // reset response after 5 seconds
    const [responseCountDown, setResponseCountDown] = useState(false);
    useEffect(() => {
        if (errorResponse) {
            setResponseCountDown(true);
            setTimeout(() => {
                setResponseCountDown(false);
                setErrorResponse(null);
            }, 5000);
        }
    }, [errorResponse]);

    return (
        <>
            <Header />

            <div className="login-box" >
                {/* /.login-logo */}
                {login && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc', marginTop: '50px' }}>
                        <div className="card-body login-card-body">

                            <div style={{ textAlign: 'center' }}>
                            </div>
                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>Login</strong></p>

                            <GoogleOAuthProvider clientId="791915019480-6n1kepg7vfup1dnkggkekr8fvpjk6m5g.apps.googleusercontent.com">
                                <GoogleLogin
                                    cookiePolicy={'single_host_origin'}
                                    buttonText="Login as google"
                                    className='form-input'
                                    onSuccess={credentialResponse => {
                                        // console.log(credentialResponse);
                                        // const details = jwt_decode(credentialResponse.credential);
                                        setUserLoginData(credentialResponse.credential);
                                        setIsLoginGoogle(true);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </GoogleOAuthProvider>

                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>-or-</p>

                            <form onSubmit={handleLogin}>
                                <div className="input-group mb-3">
                                    <input type="email" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" value={loginInfo.email} onChange={(e) => setLoginInfo((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email" />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} type={fafaEyess ? 'text' : 'password'} value={loginInfo.password} onChange={(e) => setLoginInfo((prev) => ({ ...prev, password: e.target.value }))} className="form-control" placeholder="Password" />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => setFafaEyess(fafaEyess ? false : true)} className={fafaEyess ? 'fa fa-eye' : 'fa fa-eye-slash'} />
                                        </div>
                                    </div>
                                </div>

                                {responseCountDown && errorResponse && errorResponse.isError && (
                                    <p style={{ textAlign: 'center', fontSize: '14px', color: !errorResponse.isError ? 'lightblue' : 'white', backgroundColor: !errorResponse.isError ? 'rgb(94, 94, 159)' : 'rgb(219, 164, 164)', padding: '5px', borderRadius: '5px' }}>
                                        {errorResponse.message}
                                    </p>
                                )}

                                <div className="row" style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', fontSize: '14px', marginTop: '10px' }}>
                                    <div className="col-8">
                                        <div className="icheck-primary" >
                                            <input type="checkbox" id="remember" style={{ marginRight: '6px' }} />
                                            <label htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {/* login sign in */}
                                <div>
                                    <button type="submit" style={{ height: '40px', fontSize: '14px' }} className="btn btn-primary btn-block">Login</button>
                                </div>
                            </form>
                            {/* /.social-auth-links */}
                            <p className="mb-1">
                            </p>
                            <div style={{ textAlign: 'center', margin: '15px', fontSize: '14px' }}>
                                <span>Don't have an account? <a href="#" onClick={() => {setLogin(false); setRegister(true); setIsForgot(false)}}>Register</a></span>
                            </div>
                            <div style={{ textAlign: 'center', margin: '15px', fontSize: '15px' }}>
                                <a href="#" style={{color: 'red'}} onClick={() => {setIsForgot(true); setLogin(false); setRegister(false);}}>Forgot Password?</a>
                            </div>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                )}

                {/* ================================================= Register ======================================================= */}
                {register && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc' }}>
                        <div className="card-body login-card-body">

                            <div style={{ textAlign: 'center' }}></div>
                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>Register</strong></p>

                            <GoogleOAuthProvider clientId="791915019480-6n1kepg7vfup1dnkggkekr8fvpjk6m5g.apps.googleusercontent.com">
                                <GoogleLogin
                                    cookiePolicy={'single_host_origin'}
                                    buttonText="Register as google"
                                    className='form-input'
                                    onSuccess={credentialResponse => {
                                        setUserRegisterData(credentialResponse.credential);
                                        setIsRegisterGoogle(true);
                                    }}
                                    onError={() => {
                                        console.log('Register Failed');
                                    }}
                                />
                            </GoogleOAuthProvider>

                            <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>-or-</p>

                            <form onSubmit={handleRegister}>
                                <div className="input-group mb-3">
                                    <input type="file" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} accept=".pdf, .png" onChange={(e) => setRegisterInfo((prev) => ({ ...prev, image: e.target.files[0] }))} className="form-control" placeholder="Image" required />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} value={registerInfo.fullname} onChange={(e) => setRegisterInfo((prev) => ({ ...prev, fullname: e.target.value }))} className="form-control" placeholder="Full Name" required />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="email" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" value={registerInfo.email} onChange={(e) => setRegisterInfo((prev) => ({ ...prev, email: e.target.value }))} placeholder="Your@gmail.com" required />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} type={fafaEye ? 'text' : 'password'} className="form-control" value={registerInfo.password} onChange={(e) => setRegisterInfo((prev) => ({ ...prev, password: e.target.value }))} placeholder="Password" required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => setFafaEye(fafaEye ? false : true)} className={fafaEye ? 'fa fa-eye' : 'fa fa-eye-slash'} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} type={fafaEyes ? 'text' : 'password'} className="form-control" value={registerInfo.confirmPassword} onChange={(e) => setRegisterInfo((prev) => ({ ...prev, confirmPassword: e.target.value }))} placeholder="Confirm Password" required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => setFafaEyes(fafaEyes ? false : true)} className={fafaEyes ? 'fa fa-eye' : 'fa fa-eye-slash'} />
                                        </div>
                                    </div>
                                </div>

                                {responseCountDown && errorResponse && errorResponse.isError && (
                                    <p style={{ textAlign: 'center', fontSize: '14px', color: !errorResponse.isError ? 'lightblue' : 'white', backgroundColor: !errorResponse.isError ? 'rgb(94, 94, 159)' : 'rgb(219, 164, 164)', padding: '5px', borderRadius: '5px' }}>
                                        {errorResponse.message}
                                    </p>
                                )}
                                <div>
                                    <button type="submit" style={{ height: '40px', fontSize: '14px' }} name="login" className="btn btn-primary btn-block">Register</button>
                                </div>
                            </form>
                            {/* /.social-auth-links */}
                            <p className="mb-1">
                            </p>
                            <div style={{ textAlign: 'center', margin: '15px', fontSize: '14px' }}>
                                <span>Already have an account? <a href="#" onClick={() => {setLogin(true); setRegister(false); setIsForgot(false)}}>Login</a></span>
                            </div>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                )}

                {isForgot && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc', marginTop: '50px' }}>
                        <div className="card-body login-card-body">

                            <div style={{ textAlign: 'center' }}>
                            </div>
                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>FORGOT PASSWORD</strong></p>

                            <form>
                                <div className="input-group mb-3">
                                    <input type="email" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" value={loginInfo.email} onChange={(e) => setLoginInfo((prev) => ({ ...prev, email: e.target.value }))} placeholder="Enter email or your full name" />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button type="submit" style={{ height: '40px', fontSize: '14px' }} className="btn btn-primary btn-block">Find</button>
                                </div>
                            </form>
                            {/* /.social-auth-links */}
                            <p className="mb-1">
                            </p>
                            <div style={{ textAlign: 'left', margin: '15px', fontSize: '14px' }}>
                                <a href="#" onClick={() => {setLogin(true); setRegister(false); setIsForgot(false)}}>Login</a>
                            </div>

                            <div>
                                Account Found
                            </div>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                )}
            </div>

            {isLoading && (
                <div className="popup">
                    <button class="btn btn-primary" type="button" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disabled>
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style={{ marginRight: '10px' }}></span>
                        Loading...
                    </button>
                </div>
            )}

        </>
    )
}

export default Login
