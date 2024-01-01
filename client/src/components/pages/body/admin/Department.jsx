import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

function Department() {

    const [isAddDepartment, setIsAddDepartment] = useState(false);
    const [isEditDepartment, setIsEditDepartment] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

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
                            <div className="card-header">
                                <h3 className="card-title">List of Department</h3>
                                <div className="card-tools">
                                    <a href="#" className="btn btn-flat btn-sm btn-primary" onClick={() => setIsAddDepartment(true)}><span className="fas fa-plus" />  Add New <span className='department-text'>Department</span></a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="container-fluid" style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                        <table className="table table-hover table-striped">
                                            <colgroup>
                                                <col width="5%" />
                                                <col width="20%" />
                                                <col width="30%" />
                                                <col width="15%" />
                                                <col width="10%" />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Date Created</th>
                                                    <th>Name</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {/* {departmentToSearch.length === 0 ? (
                                                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                        <span>No Department found!</span>
                                                    </div>
                                                ) : (
                                                    departmentToSearch.map((item, index) => (
                                                        <tr>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className>{item.date}</td>
                                                            <td>{item.name}</td>
                                                            <td >
                                                                <span className="badge badge-success badge-pill" style={{ background: item.status === 'Active' ? '' : 'red' }}>{item.status}</span></td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                    Action
                                                                </button>
                                                                <div className="dropdown-menu" role="menu">
                                                                    <a className="dropdown-item edit_data" href="#" onClick={() => handleEditDepartment(item)}><span className="fa fa-edit text-primary" /> Edit</a>
                                                                    <div className="dropdown-divider" />
                                                                    <a className="dropdown-item delete_data" href="#" onClick={() => handleDeleteDepartment(item)}><span className="fa fa-trash text-danger" /> Delete</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                )} */}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

            {/* ------------------  ADD DEPARTMENT  --------------------------- */}
            {isAddDepartment && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isAddDepartment ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Add Department</h5>
                        <hr />
                        <div className="container-fluid">
                            <form >
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name</label>
                                    <input type="text" className="form-control form-control-border" placeholder="Department Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Description</label>
                                    <input type="text" className="form-control form-control-border" placeholder="Description" required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">Status</label>
                                    <select name="status" id="status" className="form-control form-control-border" required>
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsAddDepartment(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------   EDIT DEPARTMENT -------------------- */}
            {isEditDepartment && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditDepartment ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit Department</h5>
                        <hr />
                        <div className="container-fluid">
                            <form action id="department-form">
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Name</label>
                                    <input type="text" className="form-control form-control-border" placeholder="Department Name" required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">Status</label>
                                    <select name="status" id="status" className="form-control form-control-border" required >
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditDepartment(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            {isDelete && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDelete ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Delete?</h5>
                        </div>
                        <hr />
                        <div className='form-div'>
                            <span>Are you sure you wan't to Delete (department name)?</span>
                        </div>

                        <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                            <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDelete(false)}>Cancel</button>
                            <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Department
