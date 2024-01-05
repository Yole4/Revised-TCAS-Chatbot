import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar';

import logo from "../../../assets/images/logo.png";
import jose from "../../../assets/images/jose.jpg";
import { PublicContext } from '../../../Context/PublicContext';
import { AdminContext } from '../../../Context/AdminContext';
import { backendUrl } from '../../../../utils/Services';
import { AuthContext } from '../../../Context/AuthContext';

function Settings() {
    document.title = "System Settings";

    const { updateSettingsData, setUpdateSettingsData, handleUpdateSettings, setLogo, setCover } = useContext(AdminContext);
    const { settingsData } = useContext(PublicContext);
    const {isLoading, errorResponse, setErrorResponse} = useContext(AuthContext);

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
                            <form onSubmit={handleUpdateSettings}>
                                <div className="card card-outline card-primary">
                                    <div className="card-header">
                                        <h5 className="card-title">System Information</h5>
                                    </div>
                                    <div className="card-body">
                                        <form action id="system-frm">
                                            <div id="msg" className="form-group" />
                                            <div className="form-group">
                                                <label className="control-label">System Name</label>
                                                <input type="text" value={updateSettingsData.systemName} onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, systemName: e.target.value }))} className="form-control form-control-sm" placeholder='System Name' />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">System Short Name</label>
                                                <input type="text" className="form-control form-control-sm" value={updateSettingsData.shortName} onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, shortName: e.target.value }))} placeholder='System Short Name' />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Welcome Content</label>
                                                <textarea cols="30" rows="10" type="text" value={updateSettingsData.welcomeContent} onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, welcomeContent: e.target.value }))} className="form-control form-control-sm summernote" placeholder='Write Welcome Message...' />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">About Us</label>
                                                <textarea cols="30" rows="10" type="text" value={updateSettingsData.about} onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, about: e.target.value }))} className="form-control form-control-sm summernote" placeholder='About...' />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">System Logo</label>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input rounded-circle" onChange={(e) => setLogo(e.target.files[0])} id="customFile" />
                                                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                                </div>
                                            </div>
                                            <div className="form-group d-flex justify-content-center">
                                                <img src={settingsData ? `${backendUrl}/${settingsData.system_logo}` : logo} alt id="cimg" className="img-fluid img-thumbnail" />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Cover</label>
                                                <div className="custom-file">
                                                    <input type="file" className="custom-file-input rounded-circle" onChange={(e) => setCover(e.target.files[0])} id="customFile" />
                                                    <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                                </div>
                                            </div>
                                            <div className="form-group d-flex justify-content-center">
                                                <img src={settingsData ? `${backendUrl}/${settingsData.system_cover}` : jose} alt id="cimg2" className="img-fluid img-thumbnail bg-gradient-dark border-dark" />
                                            </div>
                                            <fieldset>
                                                <legend>School Information</legend>
                                                <div className="form-group">
                                                    <label className="control-label" >Email</label>
                                                    <input type="email" className="form-control form-control-sm" value={updateSettingsData.systemEmail} onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, systemEmail: e.target.value }))} placeholder='System@gmail.com' />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Contact #</label>
                                                    <input type="number" className="form-control form-control-sm" value={updateSettingsData.systemNumber} onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, systemNumber: e.target.value }))} placeholder='09...' />
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">Address</label>
                                                    <textarea cols="30" rows="3" className="form-control form-control-sm" value={updateSettingsData.systemLocation} onChange={(e) => setUpdateSettingsData((prev) => ({ ...prev, systemLocation: e.target.value }))} placeholder='Address...' />
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>
                                    <div className="card-footer">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <button type='submit' className="btn btn-sm btn-primary">Update</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>

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

export default Settings
