import React, { useContext } from 'react'
import Header from './Header'
import Sidebar from './Sidebar';

import logo from "../../../assets/images/logo.png";
import jose from "../../../assets/images/jose.jpg";
import { PublicContext } from '../../../Context/PublicContext';

function Settings() {
    document.title = "System Settings";
    
    return (
        <>
            <Header />
            <Sidebar />

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6" style={{ width: '100%' }}>
                                {/* <h1 className="m-0">Welcome to Thesis and Capstone Archiving System</h1> */}
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content ">
                    <div className="container-fluid">
                        <div className="col-lg-12">
                            <div className="card card-outline card-primary">
                                <div className="card-header">
                                    <h5 className="card-title">System Information</h5>
                                </div>
                                <div className="card-body">
                                    <form action id="system-frm">
                                        <div id="msg" className="form-group" />
                                        <div className="form-group">
                                            <label className="control-label">System Name</label>
                                            <input type="text" className="form-control form-control-sm" placeholder='System Name' />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">System Short Name</label>
                                            <input type="text" className="form-control form-control-sm" placeholder='System Short Name' />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Welcome Content</label>
                                            <textarea cols="30" rows="10" type="text" className="form-control form-control-sm summernote" placeholder='Write Welcome Message...' />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">About Us</label>
                                            <textarea cols="30" rows="10" type="text" className="form-control form-control-sm summernote" placeholder='About...' />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">System Logo</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input rounded-circle" id="customFile" />
                                                {/* <input type="file" className="custom-file-input rounded-circle" id="customFile" onChange={(e) => setSystemLogo(e.target.files[0])} /> */}
                                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <img src={logo} alt id="cimg" className="img-fluid img-thumbnail" />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Cover</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input rounded-circle" id="customFile" />
                                                {/* <input type="file" className="custom-file-input rounded-circle" id="customFile" onChange={(e) => setSystemCover(e.target.files[0])} /> */}
                                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                            </div>
                                        </div>
                                        <div className="form-group d-flex justify-content-center">
                                            <img src={jose} alt id="cimg2" className="img-fluid img-thumbnail bg-gradient-dark border-dark" />
                                        </div>
                                        <fieldset>
                                            <legend>School Information</legend>
                                            <div className="form-group">
                                                <label className="control-label" >Email</label>
                                                <input type="email" className="form-control form-control-sm" placeholder='System@gmail.com' />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Contact #</label>
                                                <input type="number" className="form-control form-control-sm" placeholder='09...' />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Address</label>
                                                <textarea cols="30" rows="3" className="form-control form-control-sm" placeholder='Address...' />
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="card-footer">
                                    <div className="col-md-12">
                                        <div className="row">
                                            <button className="btn btn-sm btn-primary">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Settings
