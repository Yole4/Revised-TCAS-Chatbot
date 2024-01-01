import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

// react icons
import { IoMenuSharp } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import { VscDeviceCamera } from "react-icons/vsc";
import { AiOutlineCloseCircle } from "react-icons/ai";

import givenImage from "../assets/images/given image.png";

function Header() {

    const location = useLocation();
    const navigate = useNavigate();
    const [onSearch, setOnSearch] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [isProfile, setIsProfile] = useState(false);

    const [userType, setUserType] = useState('Admin'); // partial

    return (
        <>
            <nav className="main-header navbar navbar-expand navbar-primary navbar-dark bg-navy" style={{ width: '100%', marginLeft: '0', zIndex: '51' }}>
                {/* Left navbar links */}
                <ul className="navbar-nav">
                    <li className="nav-item d-sm-inline-block">
                        <span className="mr-2  text-white"><i className="fa fa-phone mr-1"></i> 234324234</span>
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

                    {isLogin ? (
                        <>
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

                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Shelo Mora Paglinawan</span>
                                    <img style={{ width: 25, height: 25 }} className="img-profile rounded-circle" src={givenImage} />
                                </a>

                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                    <a className="dropdown-item" data-toggle="modal" data-target="#profile" style={{ cursor: 'pointer' }} onClick={() => setIsProfile(true)}><i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                        Profile
                                    </a>
                                    {userType === "Admin" && (
                                        <a className="dropdown-item" data-toggle="modal" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}><i className="nav-icon fas fa-tachometer-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Dashboard
                                        </a>
                                    )}
                                    <a className="dropdown-item" data-toggle="modal" onClick={() => setIsChangePassword(true)} data-target="#change_password" style={{ cursor: 'pointer' }}><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                        Change Password
                                    </a>
                                    <a className="dropdown-item" data-toggle="modal" data-target="#logout" style={{ cursor: 'pointer' }} onClick={() => setIsLogout(true)}>
                                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </>
                    ) : (
                        < li className="nav-item dropdown no-arrow right-margin" style={{ marginRight: '-10px' }} onClick={() => navigate('/login')}>
                            <a className="nav-link" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Signin</span>
                                {/* <img style={{ width: 25, height: 25 }} className="img-profile rounded-circle" /> */}
                            </a>
                        </li>
                    )}
                </ul>
            </nav>

            <nav className="main-header navbar navbar-expand navbar-light border-0 navbar-light text-sm" id="top-Nav" style={{ marginLeft: '0', marginTop: '0', zIndex: '50' }}>
                <div className="container">
                    <div className="navbar-brand" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                        <img src={logo} alt="Site Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8', height: '40px', marginRight: '10px' }} />
                        <span>BSCS</span>
                    </div>
                    <button className="navbar-toggler order-1" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse order-3" id="navbarCollapse">
                        {/* Left navbar links */}
                        {/* <ul className="navbar-nav responsive-header"> */}
                        <ul className="navbar-nav navbar-header">
                            <li className="nav-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                                <span className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</span>
                            </li>
                            <li className="nav-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/projects')}>
                                <span className={location.pathname === '/projects' || location.pathname.startsWith('/view-project/') ? 'nav-link active' : 'nav-link'}>Projects</span>
                            </li>
                            <li className="nav-item dropdown">
                                <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className={location.pathname === '/department' ? 'nav-link dropdown-toggle active' : 'nav-link dropdown-toggle'} >Department</a>
                                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{ left: 0, right: 'inherit' }}>
                                    {/* {departmentList && departmentList.map(item => (
                                        item.status === "Active" && (
                                            <>
                                                <li key={item.id}>
                                                    <a href="" className="dropdown-item">{item.name}</a>
                                                </li>
                                                <li className="dropdown-divider" />
                                            </>
                                        )
                                    ))} */}
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className={location.pathname === '/courses' ? 'nav-link dropdown-toggle active' : 'nav-link dropdown-toggle'}>Courses</a>
                                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{ left: 0, right: 'inherit' }}>
                                    {/* {coursesList && coursesList.map(item => (
                                        item.status === "Active" && (
                                            <>
                                                <li key={item.id}>
                                                    <a href="./?page=projects_per_department&id=3" className="dropdown-item">{item.course}</a>
                                                </li>
                                                <li className="dropdown-divider" />
                                            </>
                                        )
                                    ))} */}
                                </ul>
                            </li>
                            <li className="nav-item" style={{ cursor: 'pointer' }} onClick={() => navigate('/about')}>
                                <span className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>About Us</span>
                            </li>


                            <li className="nav-item" Style={{ cursor: 'pointer' }} onClick={() => navigate('/new-project')}>
                                <span className={location.pathname === '/new-project' ? 'nav-link active' : 'nav-link'} style={{ cursor: 'pointer' }}>Submit New Project</span>
                            </li>
                        </ul>
                    </div>
                    {/* Right navbar links */}
                    <div className="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto">
                        <ImSearch size={20} className='search-bar' onClick={(e) => { e.stopPropagation(); setOnSearch(onSearch ? false : true) }} />
                        <input onClick={(e) => e.stopPropagation()} placeholder='Search...' className='search-input' type="text" style={{ display: onSearch ? 'block' : 'none' }} />
                        {/* <IoMenuSharp onClick={(e) => { e.stopPropagation() }} className="menu-bar" size={30} /> */}
                    </div>
                </div>
            </nav>

            {/* Change Password */}
            {isChangePassword && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isChangePassword ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <span>Change Password</span>
                        </div>
                        <hr />
                        <form >
                            <div className='form-div'>
                                <label htmlFor="">Username</label>
                                <input type="text" className='form-control' placeholder='Username' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Current Password</label>
                                <input type="password" className='form-control' placeholder='*********' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">New Password</label>
                                <input type="password" className='form-control' placeholder='*********' required />
                            </div>

                            <div style={{ marginTop: '15px' }}>
                                <label htmlFor="">Confirm Password</label>
                                <input type="password" className='form-control' placeholder='*********' required />
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
                            <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Yes</button>
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
                            <img src={givenImage} style={{ borderRadius: '50%', height: '150px', width: '150px' }} />
                            <label htmlFor="uploadPhoto" style={{ marginLeft: '-40px', cursor: 'pointer', zIndex: '3', color: 'white', position: 'absolute', marginTop: '110px' }}>
                                <VscDeviceCamera size={30} style={{ backgroundColor: 'rgb(71, 71, 98)', padding: '3px', borderRadius: '50%' }} />
                                <input type="file" id="uploadPhoto" style={{ display: 'none' }} />
                                {/* <input type="file" id="uploadPhoto" onChange={(e) => setAutoImage(e.target.files[0])} style={{ display: 'none' }} /> */}
                            </label>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div>
                                <h2 style={{ fontSize: '20px' }}>Shelo Mora Paglinawan</h2>
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                <span>Admin/Researcher</span>
                            </div><br />
                        </div>
                        <hr />
                        <div className="form-control" style={{ textAlign: 'center' }}>
                            <span>Other profile view</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Header;
