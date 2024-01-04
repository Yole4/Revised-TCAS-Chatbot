import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { AdminContext } from '../../../Context/AdminContext';
import { AuthContext } from '../../../Context/AuthContext';

function Courses() {
    document.title = "Courses";

    const { courseList, courseData, setCourseData, isAddCourse, setIsAddCourse, handleAddCourse,
        editCourseData, setEditCourseData, isEditCourse, setIsEditCourse, handleEditCourse,
        deleteCourseData, setDeleteCourseData, isDeleteCourse, setIsDeleteCourse, handleDeleteCourse
    } = useContext(AdminContext);
    const { isLoading, errorResponse, setErrorResponse } = useContext(AuthContext);

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
                        <div className="card card-outline card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Courses</h3>
                                <div className="card-tools">
                                    <a href="#" className="btn btn-flat btn-sm btn-primary" onClick={() => setIsAddCourse(true)}><span className="fas fa-plus" />  Add New Course</a>
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
                                                    <th>Course</th>
                                                    <th>Acronym</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {courseList.length === 0 ? (
                                                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                        <span>No Course found!</span>
                                                    </div>
                                                ) : (
                                                    courseList.map((item, index) => (
                                                        <tr>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className>{item.date}</td>
                                                            <td>{item.course}</td>
                                                            <td>{item.acronym}</td>
                                                            <td >
                                                                <span className="badge badge-success badge-pill" style={{ background: item.status === 'Active' ? '' : 'red' }}>{item.status}</span></td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                    Action
                                                                </button>
                                                                <div className="dropdown-menu" role="menu">
                                                                    <a className="dropdown-item edit_data" href="#" onClick={() => { setIsEditCourse(true); setEditCourseData({ editId: item.id, course: item.course, status: item.status, acro: item.acronym }) }} ><span className="fa fa-edit text-primary" /> Edit</a>
                                                                    <div className="dropdown-divider" />
                                                                    <a className="dropdown-item delete_data" href="#" onClick={() => { setIsDeleteCourse(true); setDeleteCourseData({ deleteId: item.id, course: item.course }) }} ><span className="fa fa-trash text-danger" /> Delete</a>
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

                </section>
            </div>

            {/* ------------------  ADD COURSE  --------------------------- */}
            {isAddCourse && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isAddCourse ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Add New Course</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleAddCourse}>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Course</label>
                                    <input type="text" className="form-control form-control-border" value={courseData.course} onChange={(e) => setCourseData((prev) => ({ ...prev, course: e.target.value }))} placeholder="e.g. Bachelor of Science in Computer Science" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Acronym</label>
                                    <input type="text" className="form-control form-control-border" value={courseData.acro} onChange={(e) => setCourseData((prev) => ({ ...prev, acro: e.target.value }))} placeholder="e.g. BSCS" required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">Status</label>
                                    <select name="status" id="status" value={courseData.status} onChange={(e) => setCourseData((prev) => ({ ...prev, status: e.target.value }))} className="form-control form-control-border" required>
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsAddCourse(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------   EDIT COURSES -------------------- */}
            {isEditCourse && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditCourse ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit Course</h5>
                        <hr />
                        <div className="container-fluid">
                            <form action id="department-form" onSubmit={handleEditCourse}>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Course</label>
                                    <input type="text" className="form-control form-control-border" value={editCourseData.course} onChange={(e) => setEditCourseData((prev) => ({ ...prev, course: e.target.value }))} placeholder="Course Name" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="control-label">Acronym</label>
                                    <input type="text" className="form-control form-control-border" value={editCourseData.acro} onChange={(e) => setEditCourseData((prev) => ({ ...prev, acro: e.target.value }))} placeholder="e.g. BSCS" required />
                                </div>
                                <div className="form-group" style={{ marginBottom: '30px' }}>
                                    <label htmlFor className="control-label">Status</label>
                                    <select name="status" id="status" className="form-control form-control-border" value={editCourseData.status} onChange={(e) => setEditCourseData((prev) => ({ ...prev, status: e.target.value }))} required >
                                        <option value="" selected disabled>Select Status</option>
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditCourse(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            {isDeleteCourse && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDeleteCourse ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Delete?</h5>
                        </div>
                        <hr />
                        <form onSubmit={handleDeleteCourse}>
                            <div className='form-div'>
                                <span>Are you sure you wan't to Delete {deleteCourseData.course}?</span>
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDeleteCourse(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }} >Delete</button>
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

export default Courses
