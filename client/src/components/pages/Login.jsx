import React, { useState } from 'react';
import Header from './Header';

function Login() {

    const [login, setLogin] = useState(true);

    const [fafaEye, setFafaEye] = useState(false);
    const [fafaEyes, setFafaEyes] = useState(false);
    const [fafaEyess, setFafaEyess] = useState(false);
    
    return (
        <>
            <Header />

            <div className="login-box" style={{ width: '450px', overflow: 'auto', marginTop: '20px', marginLeft: '50%', transform: 'translateX(-50%)' }} >
                {/* /.login-logo */}
                {login && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc', marginTop: '50px' }}>
                        <div className="card-body login-card-body">

                            <div style={{ textAlign: 'center' }}>
                            </div>
                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>Login</strong></p>
                            <form >
                                <div className="input-group mb-3">
                                    <input type="text" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" placeholder="Username" />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} type={fafaEyess ? 'text' : 'password'} className="form-control" placeholder="Password"  />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => setFafaEyess(fafaEyess ? false : true)} className={fafaEyess ? 'fa fa-eye' : 'fa fa-eye-slash'} />
                                        </div>
                                    </div>
                                </div>

                                {/* {isErrorResponse && errorResponse && (
                                    <p style={{ textAlign: 'center', fontSize: '14px', color: errorResponse.error ? 'lightblue' : 'white', backgroundColor: errorResponse.error ? 'rgb(94, 94, 159)' : 'rgb(219, 164, 164)', padding: '5px', borderRadius: '5px' }}>
                                        {!errorResponse.error && errorResponse.message}
                                    </p>
                                )} */}

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
                                <span>Don't have an account? <a href="#" onClick={() => setLogin(false)}>Register</a></span>
                            </div>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                )}

                {/* ================================================= Register ======================================================= */}
                {!login && (
                    <div className="card" id="loginPage" style={{ padding: '0px 20px 0px 20px', overflow: 'auto', border: '2px solid #ccc' }}>
                        <div className="card-body login-card-body">

                            <div style={{ textAlign: 'center' }}></div>
                            <p style={{ textAlign: 'center', fontSize: 20, padding: '0px 10px 15px 0px' }}><strong>Register</strong></p>
                            <form >
                                <div className="input-group mb-3">
                                    <input type="text" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" placeholder="First Name" required />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" placeholder="Middle Name" />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" placeholder="Last Name"  required />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" placeholder="Your@gmail.com" required />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="number" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" placeholder="+63"  required />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input type="text" style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} className="form-control" placeholder="Username" required />
                                    <div className="input-group-append" >
                                        <div className="input-group-text">
                                            <span className="fas fa-user" style={{ fontSize: '14px' }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} type={fafaEye ? 'text' : 'password'} className="form-control" placeholder="Password" required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => setFafaEye(fafaEye ? false : true)} className={fafaEye ? 'fa fa-eye' : 'fa fa-eye-slash'} />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group mb-3">
                                    <input style={{ height: '40px', paddingLeft: '15px', fontSize: '14px' }} type={fafaEyes ? 'text' : 'password'} className="form-control" placeholder="Confirm Password" required />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span style={{ cursor: 'pointer', fontSize: '14px' }} onClick={() => setFafaEyes(fafaEyes ? false : true)} className={fafaEyes ? 'fa fa-eye' : 'fa fa-eye-slash'} />
                                        </div>
                                    </div>
                                </div>

                                {/* {isErrorResponse && errorResponse && (
                                    <p style={{ textAlign: 'center', fontSize: '14px', color: errorResponse.error ? 'lightblue' : 'white', backgroundColor: errorResponse.error ? 'rgb(94, 94, 159)' : 'rgb(219, 164, 164)', padding: '5px', borderRadius: '5px' }}>
                                        {!errorResponse.error && errorResponse.message}
                                    </p>
                                )} */}
                                <div>
                                    <button type="submit" style={{ height: '40px', fontSize: '14px' }} name="login" className="btn btn-primary btn-block">Register</button>
                                </div>
                            </form>
                            {/* /.social-auth-links */}
                            <p className="mb-1">
                            </p>
                            <div style={{ textAlign: 'center', margin: '15px', fontSize: '14px' }}>
                                <span>Don't have an account? <a href="#" onClick={() => setLogin(true)}>Login</a></span>
                            </div>
                        </div>
                        {/* /.login-card-body */}
                    </div>
                )}
            </div>
        </>
    )
}

export default Login
