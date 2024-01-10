import React, { useContext, useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

// react icons
import { BiSearch } from "react-icons/bi";
import { AdminContext } from '../../../Context/AdminContext';
import { backendUrl } from '../../../../utils/Services';
import { AuthContext } from '../../../Context/AuthContext';
import { PublicContext } from '../../../Context/PublicContext';

function UsersRequestUpload() {
    document.title = "Users Request To Upload Document";

    const { isLoading, setErrorResponse, errorResponse } = useContext(AuthContext);
    const { archiveFiles } = useContext(PublicContext);
    const {handleAcceptFile} = useContext(AdminContext);

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
                        <style dangerouslySetInnerHTML={{ __html: "\n .img-avatar {\n  width: 45px;\n height: 45px;\n object-fit: cover;\n object-position: center center;\n  border-radius: 100%;\n }\n                    " }} />
                        <div className="card card-outline card-primary">
                            <div className="card-header" style={{ display: 'flex' }}>
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>Users Request To Upload New Document</h3>
                                <input className="form-control " type="search" placeholder="Search" aria-label="Search" style={{ width: '200px', paddingLeft: '28px', position: 'absolute', right: '15px', height: '30px', marginTop: '-5px' }} />
                                <BiSearch size={20} style={{ position: 'absolute', right: '190px' }} />
                            </div>
                            <div className="card-body" style={{ height: 'auto' }}>
                                <div className="container-fluid">
                                    <div className="container-fluid">
                                        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                            <table className="table table-hover table-striped">
                                                <colgroup>
                                                    <col width="3%" />
                                                    <col width="30%" />
                                                    <col width="50%" />
                                                    <col width="17%" />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Users Name</th>
                                                        <th>Project Title</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {archiveFiles.length === 0 ? (
                                                        <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                            <span>No Requested found!</span>
                                                        </div>
                                                    ) : (
                                                        archiveFiles.map((item, index) => (
                                                            item.confirmation === 0 && (
                                                                <tr>
                                                                    <td className="text-center">{index + 1}</td>
                                                                    <td><p className="m-0 truncate-1">{item.request_name}</p></td>
                                                                    <td><p className="m-0 truncate-1">{item.project_title}</p></td>
                                                                    <td align="center">
                                                                        <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                            Action
                                                                            <span className="sr-only">Toggle Dropdown</span>
                                                                        </button>
                                                                        <div className="dropdown-menu" role="menu">
                                                                            <a class="dropdown-item" target='_blank' href={`/view-project/${1000 + item.id}`} style={{ cursor: 'pointer' }}><span class="fa fa-external-link-alt text-gray"></span> View File</a>
                                                                            <div class="dropdown-divider"></div>
                                                                            <a class="dropdown-item update_status" style={{ cursor: 'pointer' }} onClick={() => handleAcceptFile(item)}><span class="fa fa-check text-dark"></span>Accept</a>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default UsersRequestUpload
