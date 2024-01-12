import React, { useState } from 'react';
import Header from './Header';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useEffect } from 'react';
import { PublicContext } from '../Context/PublicContext';
import { backendUrl } from '../../utils/Services';

function Login() {

    const { isLoading, setIsLoading, errorResponse, setErrorResponse,
        userLoginData, setUserLoginData, isLoginGoogle, setIsLoginGoogle,
        userRegisterData, setUserRegisterData, isRegisterGoogle, setIsRegisterGoogle,
        handleRegister, registerInfo, setRegisterInfo,
        loginInfo, setLoginInfo, handleLogin
    } = useContext(AuthContext);

    const { emailFullname, setEmailFullname, foundAccounts, handleFindAccount, login, setLogin, register, setRegister, isForgot, setIsForgot, isFound, setIsFound, isMe, setIsMe, isPasswordLogin, setIsPasswordLogin, isConfirm, setIsConfirm,
        userData, setUserData, handleContinue, confirmCode, setConfirmCode, handleConfirm, isNewPassword, setIsNewPassword, newPassword, setNewPassword, handleNewPassword
    } = useContext(PublicContext);

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

    const maskEmail = (email) => {
        const atIndex = email.indexOf('@');
        const username = email.substring(0, atIndex);
        const domain = email.substring(atIndex);

        // Mask characters in the username, leaving the first two and last two visible
        const maskedUsername = username.substring(0, 2) + '*'.repeat(username.length - 4) + username.slice(-2);

        return maskedUsername + domain;
    };

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
                                <span>Don't have an account? <a href="#" onClick={() => { setLogin(false); setRegister(true); setIsForgot(false); setIsFound(false) }}>Register</a></span>
                            </div>
                            <div style={{ textAlign: 'center', margin: '15px', fontSize: '15px' }}>
                                <a href="#" style={{ color: 'red' }} onClick={() => { setIsForgot(true); setLogin(false); setRegister(false); setIsFound(false) }}>Forgot Password?</a>
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
                                <span>Already have an account? <a href="#" onClick={() => { setLogin(true); setRegister(false); setIsForgot(false); setIsFound(false) }}>Login</a></span>
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

                            <form onSubmit={handleFindAccount}>
                                <div className="input-group mb-3">
                                    <input type="text" required style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" value={emailFullname} onChange={(e) => setEmailFullname(e.target.value)} placeholder="Enter your email or fullname" />
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
                                <a href="#" onClick={() => { setLogin(true); setRegister(false); setIsForgot(false); setIsFound(false) }}>Login</a>
                            </div>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                )}

                {isFound && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc', marginTop: '50px' }}>
                        <div className="card-body login-card-body">

                            <div style={{ textAlign: 'center' }}>
                            </div>
                            {foundAccounts && foundAccounts.length > 0 ? (
                                <>
                                    <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>FOUND ACCOUNTS FOR <br />'<span style={{ fontStyle: 'italic' }}>{emailFullname}</span>'</strong></p>

                                    <hr style={{ marginTop: '-20px' }} />
                                    {foundAccounts && foundAccounts.map(item => (
                                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0' }}>
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <img src={item.image.startsWith("https") ? item.image : `${backendUrl}/${item.image}`} alt="" style={{ width: '50px', height: '50px', borderRadius: '5px' }} />
                                                <span>{item.fullname}</span>
                                            </div>
                                            <button className='btn btn-primary' style={{ fontSize: '12px' }} onClick={() => { setUserData({ id: item.id, fullname: item.fullname, email: item.email, image: item.image }); setIsFound(false); setIsMe(true) }}>This Is Me</button>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>THERE IS NO ACCOUNT FOUND FOR <br /><span style={{ fontStyle: 'italic', color: 'red' }}>'{emailFullname}'</span></strong></p>
                            )}

                            <div style={{ textAlign: 'left', fontSize: '14px', marginTop: '25px' }}>
                                <a href="#" onClick={() => { setLogin(false); setRegister(false); setIsForgot(true); setIsFound(false); setIsMe(false) }}>Back</a>
                            </div>
                        </div>
                    </div>
                )}

                {isPasswordLogin && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc', marginTop: '50px' }}>
                        <div className="card-body login-card-body">

                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>LOGIN</strong></p>
                            <hr style={{ marginTop: '-20px' }} />

                            <div style={{ textAlign: 'center' }}>
                                <div>
                                    <img src={userData && userData.image.startsWith("https") ? userData.image : `${backendUrl}/${userData.image}`} alt="" style={{ borderRadius: '50%', height: '80px', width: '80px' }} />
                                </div>
                                <div className="form-group">
                                    <h5 style={{ marginTop: '10px' }}>{userData && userData.fullname}</h5>
                                </div>
                            </div>

                            <form onSubmit={handleLogin}>
                                <input type="password" placeholder='Enter your password' required value={loginInfo.password} onChange={(e) => setLoginInfo((prev) => ({ ...prev, password: e.target.value }))} className="form-control" />

                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <input type="submit" className='btn btn-primary' value="Login" style={{ width: '100%' }} />
                                </div>
                            </form>

                            <div style={{ textAlign: 'left', fontSize: '14px', marginTop: '25px' }}>
                                <a href="#" onClick={() => { setLogin(false); setRegister(false); setIsForgot(false); setIsFound(false); setIsMe(true); setIsPasswordLogin(false) }}>Back</a>
                            </div>
                        </div>
                    </div>
                )}

                {isMe && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc', marginTop: '50px' }}>
                        <div className="card-body login-card-body">

                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>RESET PASSWORD </strong></p>
                            <hr style={{ marginTop: '-20px' }} />

                            <div style={{ textAlign: 'center' }}>
                                <div>
                                    <img src={userData && userData.image.startsWith("https") ? userData.image : `${backendUrl}/${userData.image}`} alt="" style={{ borderRadius: '50%', height: '80px', width: '80px' }} />
                                </div>
                                <div className="form-group">
                                    <h5 style={{ marginTop: '10px' }}>{userData && userData.fullname}</h5>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '10px' }}>
                                <input type="radio" checked={true} />
                                <span>Send Code To {userData && maskEmail(userData.email)}</span>
                            </div>

                            <hr />

                            <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', fontSize: '12px' }}>
                                <button className='btn btn-primary' style={{ backgroundColor: 'lightgray', color: 'black', border: '1px solid lightgray' }} onClick={() => { setIsFound(false); setIsPasswordLogin(true); setIsMe(false); setLoginInfo((prev) => ({ ...prev, email: userData.email })) }}>Enter password to login</button>
                                <button className='btn btn-primary' onClick={() => handleContinue()}>Continue</button>
                            </div>

                            <div style={{ textAlign: 'left', fontSize: '14px', marginTop: '10px' }}>
                                <a href="#" onClick={() => { setLogin(false); setRegister(false); setIsForgot(false); setIsFound(true); setIsMe(false) }}>Back</a>
                            </div>
                        </div>

                    </div>
                )}

                {isConfirm && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc', marginTop: '50px' }}>
                        <div className="card-body login-card-body">

                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>CONFIRMATION</strong></p>
                            <hr style={{ marginTop: '-20px' }} />

                            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', gap: '10px' }}>
                                <input type="radio" checked={true} />
                                <span>Sent to {userData && maskEmail(userData.email)}</span>
                            </div>

                            <form onSubmit={handleConfirm}>
                                <input style={{ marginTop: '15px' }} value={confirmCode} onChange={(e) => setConfirmCode(e.target.value)} type="text" placeholder='Enter Code' className="form-control" />

                                <div className="form-group" style={{ marginTop: '15px' }}>
                                    <input type="submit" className='btn btn-primary' value="Verify" style={{ width: '100%' }} />
                                </div>
                            </form>

                            <div style={{ textAlign: 'left', fontSize: '14px', marginTop: '25px' }}>
                                <a href="#" onClick={() => { setLogin(false); setRegister(false); setIsForgot(false); setIsFound(false); setIsMe(true); setIsPasswordLogin(false); setIsConfirm(false); }}>Back</a>
                            </div>
                        </div>
                    </div>
                )}

                {isNewPassword && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc', marginTop: '50px' }}>
                        <div className="card-body login-card-body">

                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>NEW PASSWORD </strong></p>
                            <hr style={{ marginTop: '-20px' }} />

                            <div style={{ textAlign: 'center' }}>
                                <div>
                                    <img src={userData && userData.image.startsWith("https") ? userData.image : `${backendUrl}/${userData.image}`} alt="" style={{ borderRadius: '50%', height: '80px', width: '80px' }} />
                                </div>
                                <div className="form-group">
                                    <h5 style={{ marginTop: '10px' }}>{userData && userData.fullname}</h5>
                                </div>
                            </div>

                            <form onSubmit={handleNewPassword}>
                                <div className="form-group">
                                    <label >New Password</label>
                                    <input type="password" placeholder='**********' value={newPassword.password} onChange={(e) => setNewPassword((prev) => ({ ...prev, password: e.target.value }))} required className="form-control" />
                                </div>

                                <div className="form-group">
                                    <label >Confirm Password</label>
                                    <input type="password" placeholder='**********' value={newPassword.confirmPassword} onChange={(e) => setNewPassword((prev) => ({ ...prev, confirmPassword: e.target.value }))} required className="form-control" />
                                </div>

                                <div className="form-group">
                                    <input type="submit" style={{ width: '100%' }} value="Submit" className="btn btn-primary" />
                                </div>
                            </form>

                            <div style={{ textAlign: 'left', fontSize: '14px', marginTop: '10px' }}>
                                <a href="#" onClick={() => { setLogin(false); setRegister(false); setIsForgot(false); setIsFound(false); setIsMe(false); setIsNewPassword(false); setIsConfirm(true) }}>Back</a>
                            </div>
                        </div>

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
