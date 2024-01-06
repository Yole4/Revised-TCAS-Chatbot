import React, { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import givenImage from '../../assets/images/given image.png';
import { AdminContext } from '../../Context/AdminContext';
import { AuthContext } from '../../Context/AuthContext';

function SubmitProject() {
    document.title = "Submit New Project";

    const { departmentToSearch, courseList, schoolYearList,
        setArchiveFile, submitThesisAndCapstone, setSubmitThesisAndCapstone, setIsAlert, isAlert, handleImageChange, imagePreview, handleSubmitProject
    } = useContext(AdminContext);

    const {isLoading, setErrorResponse, errorResponse} = useContext(AuthContext);

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

            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0' }}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="content py-4">
                            <div className="card card-outline card-primary shadow rounded-0">
                                <div className="card-header rounded-0">
                                    <h5 className="card-title">Submit Project</h5>
                                </div>
                                <div className="card-body rounded-0">
                                    <div className="container-fluid">
                                        <form onSubmit={handleSubmitProject}>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="year" className="control-label text-navy">Department</label>
                                                        <select id="year" className="form-control form-control-border" value={submitThesisAndCapstone.department} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({...prev, department: e.target.value}))} required>
                                                            <option value="" selected disabled>Select Department</option>
                                                            {departmentToSearch && departmentToSearch.map(item => (
                                                                (item.status === "Active" && (
                                                                    <option key={item.id} value={item.name}>{item.name}</option>
                                                                ))
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="year" className="control-label text-navy">Course</label>
                                                        <select id="year" className="form-control form-control-border" value={submitThesisAndCapstone.course} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({...prev, course: e.target.value}))} required>
                                                            <option value="" selected disabled>Select Course</option>
                                                            {courseList && courseList.map(item => (
                                                                (item.status === "Active" && (
                                                                    <option key={item.id} value={item.course}>{item.course}</option>
                                                                ))
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="title" className="control-label text-navy">Project
                                                            Title</label>
                                                        <input type="text" placeholder='Project Title...' value={submitThesisAndCapstone.projectTitle} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({...prev, projectTitle: e.target.value}))} className="form-control form-control-border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="year" className="control-label text-navy">School Year</label>
                                                        <select id="year" className="form-control form-control-border" value={submitThesisAndCapstone.schoolYear} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({...prev, schoolYear: e.target.value}))} required >
                                                            <option value="" selected disabled>Select School Year</option>
                                                            {schoolYearList && schoolYearList.map(item => (
                                                                (item.status === "Active" && (
                                                                    <option key={item.id} value={item.school_year}>{item.school_year}</option>
                                                                ))
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="members" className="control-label text-navy">Project
                                                            Members</label>
                                                        <input type="text" value={submitThesisAndCapstone.members} onChange={(e) => setSubmitThesisAndCapstone((prev) => ({...prev, members: e.target.value}))} placeholder="e.g. Juan M. Batilad, Eloy E. Mora" className="form-control form-control-border summernote-list-only" required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="img" className="control-label text-muted">Project
                                                            Image/Banner Image</label>
                                                        <input type="file" className="form-control form-control-border" accept="image/png,image/jpeg" onChange={handleImageChange} required />
                                                    </div>
                                                    <div className="form-group text-center">
                                                        <img src={imagePreview ? imagePreview : givenImage} alt="My Avatar" id="cimg" className="img-fluid banner-img bg-gradient-dark border" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label htmlFor="pdf" className="control-label text-muted">Project Document
                                                            (PDF File Only)</label>
                                                        <input type="file" className="form-control form-control-border" onChange={(e) => setArchiveFile(e.target.files[0])} accept="application/pdf" required />
                                                    </div>
                                                </div>
                                            </div>
                                            {submitThesisAndCapstone.foundAbstract && (
                                                <div class="row">
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <label for="abstract" class="control-label text-navy">Abstract</label>
                                                            <textarea rows="15" value={submitThesisAndCapstone.foundAbstract} placeholder="abstract" class="form-control form-control-border summernote"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="form-group text-center" style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                                                        <button className="btn btn-primary" style={{ width: '110px' }} type='submit'> Add</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* -----------------------NO ABSTRACT ALERT   ---------------------- */}
            {isAlert && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isAlert ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Alert!</h5>
                        </div>
                        <hr />
                        <div className='form-div'>
                            <span>No Abstract Found! Please check your PDF file and upload again!</span>
                        </div>

                        <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                            <button className='btn btn-primary' type='submit' style={{ width: '100%' }} onClick={() => setIsAlert(false)}>Ok</button>
                        </div>
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

export default SubmitProject
