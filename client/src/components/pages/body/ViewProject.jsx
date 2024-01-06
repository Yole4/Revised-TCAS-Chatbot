import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header';
import { useParams } from 'react-router-dom';
import { PublicContext } from '../../Context/PublicContext';
import { backendUrl } from '../../../utils/Services';
import { AuthContext } from '../../Context/AuthContext';

// pdf viewer
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { AdminContext } from '../../Context/AdminContext';


function ViewProject() {
    const projectId = useParams();

    const { archiveFiles } = useContext(PublicContext);
    const { userCredentials, isLoading, setErrorResponse, errorResponse, user } = useContext(AuthContext);
    const { setArchiveId, requestData, handleButtonRequest } = useContext(AdminContext);

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

    useEffect(() => {
        if (projectId) {
            setArchiveId(projectId.id);
        }
    }, [projectId]);

    return (
        <>
            <Header />

            <section className="content ">
                <div className="container">
                    <div className="content py-4">
                        <div className="col-12">
                            <div className="card card-outline card-primary shadow rounded-0">
                                {/* <div className="card-header">
                                    <h3 className="card-title">
                                        Archive - 2021120003              </h3>
                                </div> */}

                                <div className="card-body rounded-0">
                                    {archiveFiles && archiveFiles.map(item => (
                                        item.id === (projectId.id) - 1000 && (
                                            <div className="container-fluid">
                                                <h2><b>{item.project_title}</b></h2>
                                                <small className="text-muted">Submitted by <b className="text-info">Admin</b> {item.date}</small>
                                                <hr />
                                                <center>
                                                    <img src={`${backendUrl}/${item.image_banner}`} alt="Banner Image" id="banner-img" className="img-fluid border bg-gradient-dark" />
                                                </center>
                                                <fieldset>
                                                    <legend className="text-navy">Project School Year:</legend>
                                                    <div className="pl-4"><large>{item.school_year}</large></div>
                                                </fieldset>
                                                <fieldset>
                                                    <legend className="text-navy">Abstract:</legend>
                                                    <div className="pl-4"><large><p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0 }}>{item.abstract}</p></large></div>
                                                </fieldset>
                                                <fieldset>
                                                    <legend className="text-navy">Members:</legend>
                                                    <div className="pl-4"><large><p><b>Researchers</b></p>
                                                        <ul>
                                                            {item.members && item.members.split(',').map((item, index) => (
                                                                <li key={index}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </large>
                                                    </div>
                                                </fieldset>
                                                <fieldset>
                                                    {user && (
                                                        userCredentials && userCredentials.user_type === "Admin" || requestData && requestData.status === "Approved" ? (
                                                            <>
                                                                <legend className="text-navy">Project Document:</legend>
                                                                <div className="pl-4">
                                                                    <iframe src={`${backendUrl}/${item.file_path}`} style={{ minHeight: '80vh' }} className="text-center w-100">Loading Document ...</iframe>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            requestData ? (
                                                                requestData && requestData.status === "Pending" && (
                                                                    <div style={{ textAlign: 'center', margin: '10px' }}>
                                                                        <span style={{ padding: '10px', background: 'red', color: '#fff', borderRadius: '3px' }}>Pending Request</span>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                <div style={{ textAlign: 'center', margin: '10px' }}>
                                                                    <button style={{ padding: '10px' }} className='btn btn-primary' onClick={() => handleButtonRequest(item)}>Request To View Document</button>
                                                                </div>
                                                            )
                                                        )
                                                    )}
                                                </fieldset>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

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

export default ViewProject
