import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import givenImage from "../../../assets/images/given image.png";

// react icons 
import { AiTwotoneHome, AiOutlineCloseCircle } from "react-icons/ai";
import { VscDeviceCamera } from "react-icons/vsc";

import { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';

import { backendUrl } from '../../../../utils/Services';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const { userCredentials, isLoading, isLogout, setIsLogout, handleLogout, setAutoImage, isProfile, setIsProfile, errorResponse, setErrorResponse,
        changePasswordInfo, setChangePasswordInfo, handleChangePassword, isChangePassword, setIsChangePassword,
        isEditProfile, setIsEditProfile, changeProfileInfo, setChangeProfileInfo, handleChangeProfile
    } = useContext(AuthContext);

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
            <nav className="main-header navbar navbar-expand navbar-primary navbar-dark bg-navy">
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block" onClick={() => navigate('/')}>
                        <span style={{ cursor: 'pointer' }} className="nav-link">Home</span>
                    </li>
                </ul>
                {/* Right navbar links */}
                <ul className="navbar-nav ml-auto">
                    {/* Messages Dropdown Menu */}
                    <li className="nav-item dropdown">
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <a href="#" className="dropdown-item">
                                {/* Message Start */}
                                {/* Message End */}
                            </a>
                            <div className="dropdown-divider" />
                            <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
                        </div>
                    </li>
                    {/* Notifications Dropdown Menu */}
                    {/* // ================================================================= NOTIFICATION =============================================================================== */}
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#">
                            <i className="far fa-bell" />
                            <span className="badge badge-warning navbar-badge">3</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">3 Notification</span>


                            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                                {/* {myNotifications && myNotifications.reverse().map(item => (
                                    <div key={item.id} className='dropdown-item other' onClick={() => item.notification_type === "Request Document" && navigate('/student-list')} style={{ fontSize: '12px', cursor: 'pointer', backgroundColor: item.seen === 0 ? 'rgba(131, 131, 131, 0.20)' : '' }}>
                                        <div style={{ display: 'flex' }}>
                                            <i className="fas fa-bell mr-2" style={{ color: 'rgba(80, 66, 66, 0.935)', fontSize: '15px', marginTop: '5px' }} /><p style={{ marginLeft: '10px' }}>{item.content}</p>
                                        </div>
                                        <div style={{ marginLeft: '10px' }}>
                                            <p style={{ marginLeft: 22, fontSize: 10, color: 'rgb(105, 96, 96)' }}>{item.date}</p>
                                        </div>
                                    </div>
                                ))} */}
                            </div>

                            <div className="dropdown-divider" />
                            <a data-toggle="modal" data-target="#allNotification" style={{ cursor: 'pointer' }} className="dropdown-item dropdown-footer">See All Notifications</a>
                        </div>
                    </li>

                    {/* Admin Profile */}
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{userCredentials && userCredentials.fullname}</span>
                            <img style={{ width: 25, height: 25 }} className="img-profile rounded-circle" src={userCredentials ? userCredentials.image.startsWith('https://') ? userCredentials.image : `${backendUrl}/${userCredentials.image}` : givenImage} />
                        </a>

                        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a className="dropdown-item" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }} onClick={() => setIsProfile(true)}><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                Profile
                            </a>
                            <a className="dropdown-item" onClick={() => navigate('/')} data-toggle="modal" style={{ cursor: 'pointer' }}><i className="fa-sm fa-fw mr-2 text-gray-400" ><AiTwotoneHome size={18} style={{ color: 'black', marginTop: '-3px' }} /></i>
                                Home
                            </a>
                            <a className="dropdown-item" data-toggle="modal" onClick={() => setIsChangePassword(true)} data-target="#change_password" style={{ cursor: 'pointer' }}><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                Change Password
                            </a>
                            <a className="dropdown-item" data-toggle="modal" data-target="#logout" style={{ cursor: 'pointer' }} onClick={() => setIsLogout(true)}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>

            {/* Change Password */}
            {isChangePassword && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isChangePassword ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span>Change Password</span>
                        </div>
                        <hr />
                        <form onSubmit={handleChangePassword}>
                            <div className='form-div'>
                                <label htmlFor="">Email</label>
                                <input type="email" className='form-control' value={changePasswordInfo.email} onChange={(e) => setChangePasswordInfo((prev) => ({ ...prev, email: e.target.value }))} placeholder='Email' required />
                            </div>

                            {userCredentials && userCredentials.password.length > 0 && (
                                <div style={{ marginTop: '15px' }}>
                                    <label htmlFor="">Current Password</label>
                                    <input type="password" className='form-control' value={changePasswordInfo.currentPassword} onChange={(e) => setChangePasswordInfo((prev) => ({ ...prev, currentPassword: e.target.value }))} placeholder='*********' required />
                                </div>
                            )}

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">New Password</label>
                                <input type="password" className='form-control' value={changePasswordInfo.newPassword} onChange={(e) => setChangePasswordInfo((prev) => ({ ...prev, newPassword: e.target.value }))} placeholder='*********' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Confirm Password</label>
                                <input type="password" className='form-control' value={changePasswordInfo.confirmPassword} onChange={(e) => setChangePasswordInfo((prev) => ({ ...prev, confirmPassword: e.target.value }))} placeholder='*********' required />
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsChangePassword(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* -----------------------LOGOUT CONFIRMATION---------------------- */}
            {isLogout && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isLogout ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Logout?</h5>
                        </div>
                        <hr />
                        <div className='form-div'>
                            <span>Are you sure you wan't to logout?</span>
                        </div>

                        <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                            <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsLogout(false)}>No</button>
                            <button className='btn btn-primary' type='submit' style={{ width: '80px' }} onClick={() => handleLogout()}>Yes</button>
                        </div>
                    </div>
                </div>
            )}

            {/* --------   PROFILE ---------- */}
            {isProfile && (
                <div className="popup" onClick={() => setIsProfile(false)}>
                    <div className="popup-body" onClick={(e) => e.stopPropagation()} style={{ animation: isProfile ? 'dropBottom .3s linear' : '' }}>
                        <div className="modal-close" onClick={() => setIsProfile(false)}>
                            <AiOutlineCloseCircle size={30} />
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <img src={userCredentials ? userCredentials.image.startsWith('https://') ? userCredentials.image : `${backendUrl}/${userCredentials.image}` : givenImage} style={{ borderRadius: '50%', height: '150px', width: '150px' }} />
                            <label htmlFor="uploadPhoto" style={{ marginLeft: '-40px', cursor: 'pointer', zIndex: '3', color: 'white', position: 'absolute', marginTop: '110px' }}>
                                <VscDeviceCamera size={30} style={{ backgroundColor: 'rgb(71, 71, 98)', padding: '3px', borderRadius: '50%' }} />
                                <input type="file" id="uploadPhoto" accept='.png, .jpg' onChange={(e) => setAutoImage(e.target.files[0])} style={{ display: 'none' }} />
                            </label>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div>
                                <h2 style={{ fontSize: '20px' }}>{userCredentials && userCredentials.fullname}</h2>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <span>{userCredentials && userCredentials.user_type}</span>
                            </div><br />
                        </div>
                        <hr />
                        <div className="form-control" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => setIsEditProfile(true)}>
                            <span>Edit Profile</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Change Password */}
            {isEditProfile && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isEditProfile ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span>Edit Profile</span>
                        </div>
                        <hr />
                        <form onSubmit={handleChangeProfile}>
                            <div className='form-div'>
                                <label htmlFor="">Full Name</label>
                                <input type="text" className='form-control' value={changeProfileInfo} onChange={(e) => setChangeProfileInfo(e.target.value)} placeholder='Full Name' required />
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsEditProfile(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className="popup">
                    <button class="btn btn-primary" type="button" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disabled>
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style={{ marginRight: '10px' }}></span>
                        Loading...
                    </button>
                </div>
            )}

            {responseCountDown && errorResponse && (
                <div className='error-respond' style={{ backgroundColor: errorResponse && !errorResponse.isError ? '#7b4ae4' : '#fb7d60' }}>
                    <div>
                        <h5>{errorResponse && errorResponse.message}</h5>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
