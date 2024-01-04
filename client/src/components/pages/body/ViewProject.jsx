import React from 'react'
import Header from '../Header';
import { useParams } from 'react-router-dom';

function ViewProject() {
    const projectId = useParams();
    
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
                                {/* <div className="card-body rounded-0">
                                    {Object.keys(archiveList).length > 0 ? (
                                        <div className="container-fluid">
                                            <h2><b>{archiveList && archiveList.project_title}</b></h2>
                                            <small className="text-muted">Submitted by <b className="text-info">Admin</b> {archiveList && archiveList.date}</small>
                                            <hr />
                                            <center>
                                                <img src={archiveList && `${backendUrl}/${archiveList.image_banner}`} alt="Banner Image" id="banner-img" className="img-fluid border bg-gradient-dark" />
                                            </center>
                                            <fieldset>
                                                <legend className="text-navy">Project School Year:</legend>
                                                <div className="pl-4"><large>{archiveList && archiveList.school_year}</large></div>
                                            </fieldset>
                                            <fieldset>
                                                <legend className="text-navy">Abstract:</legend>
                                                <div className="pl-4"><large><p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0 }}>{archiveList && archiveList.abstract}</p></large></div>
                                            </fieldset>
                                            <fieldset>
                                                <legend className="text-navy">Members:</legend>
                                                <div className="pl-4"><large><p><b>Researchers</b></p>
                                                    <ul>
                                                        {archiveList && archiveList.members && archiveList.members.split(',').map((item, index) => (
                                                            <li key={index}>{item}</li>
                                                        ))}
                                                    </ul>
                                                </large>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                {userCredentials && userCredentials.user_type === "Admin" || requestData && requestData.status === "Approved" ? (
                                                    <>
                                                        <legend className="text-navy">Project Document:</legend>
                                                        <div className="pl-4">
                                                            <iframe src={archiveList && `${backendUrl}/${archiveList.file_path}`} style={{ minHeight: '80vh' }} className="text-center w-100">Loading Document ...</iframe>
                                                        </div>
                                                    </>
                                                ) : userCredentials && userCredentials.user_type === "Student" ? (
                                                    (requestData && requestData.status === "Pending" ? (
                                                        <div style={{ textAlign: 'center', margin: '10px' }}>
                                                            <span style={{ padding: '10px', background: 'red', color: '#fff', borderRadius: '3px' }}>Requested</span>
                                                        </div>
                                                    ) : (
                                                        <div style={{ textAlign: 'center', margin: '10px' }}>
                                                            <button style={{ padding: '10px' }} className='btn btn-primary' onClick={requestToViewDocument}>Request To View Document</button>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div style={{ textAlign: 'center', margin: '10px' }}>
                                                        <button style={{ padding: '10px' }} className='btn btn-primary' onClick={() => alert('You need to login for you to request!')}>Request To View Document</button>
                                                    </div>
                                                )}
                                            </fieldset>
                                        </div>
                                    ) : (
                                        <span>No archive list found!</span>
                                    )}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default ViewProject
