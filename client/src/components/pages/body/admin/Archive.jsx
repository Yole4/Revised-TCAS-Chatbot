import React, { useContext, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar';

// react icons
import { ImSearch } from "react-icons/im";
import { PublicContext } from '../../../Context/PublicContext';
import { AuthContext } from '../../../Context/AuthContext';
import { AdminContext } from '../../../Context/AdminContext';

function Archive() {
    document.title = "Archive List";

    const { isLoading, setErrorResponse, errorResponse } = useContext(AuthContext);
    const { archiveFiles } = useContext(PublicContext);
    const { handleUpdateFile, updateFileData, setUpdateFileData, isUpdateFile, setIsUpdateFile,
        handleDeleteArchive, deleteArchiveData, setDeleteArchiveData, isDeleteArchive, setIsDeleteArchive
    } = useContext(AdminContext);

    const [onSearch, setOnSearch] = useState(false);

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
                        <div className="card card-outline card-primary">
                            <div className="card-header" style={{ display: 'flex' }}>
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>List of Thesis & Capstone Archives</h3>
                                <ImSearch size={25} className='search-bar search-right' style={{ marginTop: '0px' }} onClick={() => setOnSearch(onSearch ? false : true)} />
                                <input onClick={(e) => e.stopPropagation()} placeholder='Search...' className='search-input' type="text" style={{ marginTop: '27px', display: onSearch ? 'block' : 'none' }} />
                            </div>
                            <div className="card-body" style={{ height: 'auto' }}>
                                <div className="container-fluid">
                                    <div className="container-fluid">
                                        <div style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                            <table className="table table-hover table-striped">
                                                <colgroup>
                                                    <col width="5%" />
                                                    <col width="15%" />
                                                    <col width="20%" />
                                                    <col width="20%" />
                                                    <col width="10%" />
                                                    <col width="10%" />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Date Created</th>
                                                        <th>Project Title</th>
                                                        <th>Course</th>
                                                        <th>Status</th>
                                                        <th style={{textAlign: 'center'}}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {archiveFiles.length === 0 ? (
                                                        <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                            <span>No Archive found!</span>
                                                        </div>
                                                    ) : (
                                                        archiveFiles.map((item, index) => (
                                                            <tr key={item.id}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td>{item.date}</td>
                                                                <td>{item.project_title}</td>
                                                                <td>{item.course}</td>
                                                                <td class="text-center">
                                                                    <span class='badge badge-success badge-pill' style={{ background: item.status === "Published" ? '' : 'red' }}>{item.status}</span>
                                                                </td>
                                                                <td align="center">
                                                                    <button type="button" class="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                        Action
                                                                    </button>
                                                                    <div class="dropdown-menu" role="menu">
                                                                        <a href={`/view-project/${1000 + item.id}`} target="_blank" class="dropdown-item" style={{ cursor: 'pointer' }}>
                                                                            <span class="fa fa-external-link-alt text-gray"></span> View
                                                                        </a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item update_status" style={{ cursor: 'pointer' }} onClick={() => { setIsUpdateFile(true); setUpdateFileData({ editId: item.id, projectTitle: item.project_title, status: item.status }) }}><span class="fa fa-check text-dark"></span> Update Status</a>
                                                                        <div class="dropdown-divider"></div>
                                                                        <a class="dropdown-item delete_data" style={{ cursor: 'pointer' }} onClick={() => { setIsDeleteArchive(true); setDeleteArchiveData({ deleteId: item.id, projectTitle: item.project_title }) }}><span class="fa fa-trash text-danger"></span> Delete</a>
                                                                    </div>
                                                                </td>
                                                            </tr>
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

            {/* ==============  EDIT ARCHIVE ================== */}
            {isUpdateFile && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isUpdateFile ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit Status</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleUpdateFile}>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">Status</label>
                                    <select name="status" id="status" className="form-control form-control-border" value={updateFileData.status} onChange={(e) => setUpdateFileData((prev) => ({ ...prev, status: e.target.value }))} required>
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Published">Published</option>
                                        <option value="UnPublish">UnPublish</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsUpdateFile(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            {isDeleteArchive && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDeleteArchive ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Delete?</h5>
                        </div>
                        <hr />
                        <form onSubmit={handleDeleteArchive}>
                            <div className='form-div'>
                                <span>Are you sure you wan't to Delete {deleteArchiveData.projectTitle}?</span>
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDeleteArchive(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }} >Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default Archive
