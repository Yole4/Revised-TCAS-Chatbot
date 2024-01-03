import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

// react icons
import { ImSearch } from "react-icons/im";

function Users() {
    document.title = "Users";

    const [isEditUser, setIsEditUser] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
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
                                <h3 className="card-title" style={{ color: 'darkblue', fontWeight: 'bold' }}>List of Students</h3>
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
                                                        <th>Avatar</th>
                                                        <th>Name</th>
                                                        <th>Username</th>
                                                        <th>User Type</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* {usersAccountToSearch.length === 0 ? (
                                                        <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                            <span>No Student Account found!</span>
                                                        </div>
                                                    ) : (
                                                        usersAccountToSearch.map((item, index) => (
                                                            <tr>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td className="text-center"><img src={`${backendUrl}/${item.image}`} style={{ height: '40px', width: '40px', borderRadius: '50%' }} className="img-avatar img-thumbnail p-0 border-2" alt="user_avatar" /></td>
                                                                <td>{`${item.first_name} ${item.middle_name} ${item.last_name}`}</td>
                                                                <td><p className="m-0 truncate-1">{item.username}</p></td>
                                                                <td><p className="m-0">{item.user_type}</p></td>
                                                                <td align="center">
                                                                    <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                        Action
                                                                        <span className="sr-only">Toggle Dropdown</span>
                                                                    </button>
                                                                    <div className="dropdown-menu" role="menu">
                                                                        <a className="dropdown-item" href="#" onClick={() => handleEdit(item)}><span className="fa fa-edit text-primary" /> Edit</a>
                                                                        <div className="dropdown-divider" />
                                                                        <a className="dropdown-item delete_data" href="#" onClick={() => handleDelete(item)}><span className="fa fa-trash text-danger" /> Delete</a>
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
                    </div>
                </section>
            </div>

            {/* -----------------   EDIT User -------------------- */}
            {isEditUser && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditUser ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit User</h5>
                        <hr />
                        <div className="container-fluid">
                            <form action id="department-form">
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">First Name</label>
                                    <input type="text" className="form-control form-control-border" placeholder="First Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Middle Name (Optional)</label>
                                    <input type="text" className="form-control form-control-border" placeholder="Middle Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Last Name</label>
                                    <input type="text" className="form-control form-control-border" placeholder="Last Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Username</label>
                                    <input type="text" className="form-control form-control-border" placeholder="Username" required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">User Type</label>
                                    <select name="status" id="status" className="form-control form-control-border" required>
                                        <option value="" selected disabled>Select User Type</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Student">Student</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditUser(false)}>Cancel</button>
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
                            <span>Are you sure you wan't to Delete (name of user)?</span>
                        </div>

                        <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                            <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDelete(false)}>Cancel</button>
                            <button className='btn btn-primary' type='submit' style={{ width: '80px' }} >Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Users
