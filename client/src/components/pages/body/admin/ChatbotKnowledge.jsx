import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { AuthContext } from '../../../Context/AuthContext';
import { AdminContext } from '../../../Context/AdminContext';

// react icons
import { IoIosCloseCircleOutline } from "react-icons/io";

function ChatbotKnowledge() {
    document.title = "Department List";

    const { isLoading, errorResponse, setErrorResponse } = useContext(AuthContext);
    const { chatbotInfoList, addChatbotData, setAddChatbotData, isAddChatbot, setIsAddChatbot, handleAddChatbot,
        editChatbotData, setEditChatbotData, isEditChatbot, setIsEditChatbot, handleEditChatbot,
        deleteChatbotData, setDeleteChatbotData, isDeleteChatbot, setIsDeleteChatbot, handleDeleteChatbot
    } = useContext(AdminContext);

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

    const handleChange = (index, field, value) => {
        const updatedFormData = [...addChatbotData];
        updatedFormData[index][field] = value;
        setAddChatbotData(updatedFormData);
    };

    const handleAddMore = () => {
        setAddChatbotData([...addChatbotData, { keywords: '', information: '' }]);
    };

    const handleRemove = (index) => {
        if (addChatbotData.length > 1) {
            const updatedFormData = [...addChatbotData];
            updatedFormData.splice(index, 1);
            setAddChatbotData(updatedFormData);
        }
    };

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
                                <h3 className="card-title">Chatbot Knowledge</h3>
                                <div className="card-tools">
                                    <a href="#" className="btn btn-flat btn-sm btn-primary" onClick={() => setIsAddChatbot(true)}><span className="fas fa-plus" />  Add New <span className='department-text'>Keyword</span></a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="container-fluid" style={{ maxHeight: '70vh', overflow: 'auto' }}>
                                        <table className="table table-hover table-striped">
                                            <colgroup>
                                                <col width="5%" />
                                                <col width="30%" />
                                                <col width="45%" />
                                                <col width="20%" />
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Keywords</th>
                                                    <th>Information</th>
                                                    <th style={{ textAlign: 'center' }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {chatbotInfoList.length === 0 ? (
                                                    <div style={{ position: 'absolute', width: '90%', color: 'red', margin: '15px 0px 0px 10px', fontSize: '14px' }}>
                                                        <span>No Chatbot Knowledge found!</span>
                                                    </div>
                                                ) : (
                                                    chatbotInfoList.map((item, index) => (
                                                        <tr>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td className>{item.keyword}</td>
                                                            <td>{item.information}</td>
                                                            <td style={{ textAlign: 'center' }}>
                                                                <button type="button" className="btn btn-flat btn-default btn-sm dropdown-toggle dropdown-icon" data-toggle="dropdown">
                                                                    Action
                                                                </button>
                                                                <div className="dropdown-menu" role="menu">
                                                                    <a className="dropdown-item edit_data" href="#" onClick={() => { setIsEditChatbot(true); setEditChatbotData({ editId: item.id, keyword: item.keyword, information: item.information }) }}><span className="fa fa-edit text-primary" /> Edit</a>
                                                                    <div className="dropdown-divider" />
                                                                    <a className="dropdown-item delete_data" href="#" onClick={() => { setIsDeleteChatbot(true); setDeleteChatbotData({ deleteId: item.id, keyword: item.keyword }) }} ><span className="fa fa-trash text-danger" /> Delete</a>
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

            {/* ------------------  ADD DEPARTMENT  --------------------------- */}
            {isAddChatbot && (
                <div className="popup" style={{ overflow: 'auto' }}>
                    <div className='department-modal' style={{ animation: isAddChatbot ? 'animateCenter 0.3s linear' : '' }} >
                        <h5>Add Chatbot Knowledge</h5>
                        <hr />
                        <div className="container-fluid">
                            <form onSubmit={handleAddChatbot}>
                                {addChatbotData.map((data, index) => (
                                    <div key={index} style={{ border: '2px solid #ccc', padding: '20px', paddingBottom: '10px', marginBottom: '10px', overflow: 'auto' }}>
                                        <IoIosCloseCircleOutline onClick={() => handleRemove(index)} style={{ position: 'absolute', right: '40px', marginTop: '-10px', cursor: 'pointer' }} size={30} />
                                        <div className="form-group">
                                            <label htmlFor={`keywords-${index}`}>Keyword</label>
                                            <input
                                                value={data.keywords}
                                                onChange={(e) => handleChange(index, 'keywords', e.target.value)}
                                                type="text"
                                                className="form-control"
                                                placeholder='Example: What is TCAS Chatbot'
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor={`information-${index}`}>Information</label>
                                            <textarea
                                                value={data.information}
                                                onChange={(e) => handleChange(index, 'information', e.target.value)}
                                                className="form-control"
                                                cols="30"
                                                rows="4"
                                                placeholder='Example: TCAS Means Thesis & Capstone Archiving System With Knowledge-Based Referencing Chatbot'
                                                required
                                            ></textarea>
                                        </div>
                                    </div>
                                ))}
                                <div style={{ margin: '10px 0' }}>
                                    <span style={{ color: 'blue', cursor: 'pointer' }} onClick={handleAddMore}>
                                        Add More
                                    </span>
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsAddChatbot(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------   EDIT DEPARTMENT -------------------- */}
            {isEditChatbot && (
                <div className="popup">
                    <div className='department-modal' style={{ animation: isEditChatbot ? 'animateCenter 0.3s linear' : '' }}>
                        <h5>Edit Department</h5>
                        <hr />
                        <div className="container-fluid">
                            <form action id="department-form" onSubmit={handleEditChatbot}>
                                <div style={{ border: '2px solid #ccc', padding: '20px', paddingBottom: '10px', marginBottom: '10px', overflow: 'auto' }}>
                                    <div className="form-group">
                                        <label >Keyword</label>
                                        <input
                                            value={editChatbotData.keyword}
                                            onChange={(e) => setEditChatbotData((prev) => ({...prev, keyword: e.target.value}))}
                                            type="text"
                                            className="form-control"
                                            placeholder='Example: What is TCAS Chatbot'
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label >Information</label>
                                        <textarea
                                            value={editChatbotData.information}
                                            onChange={(e) => setEditChatbotData((prev) => ({...prev, information: e.target.value}))}
                                            className="form-control"
                                            cols="30"
                                            rows="4"
                                            placeholder='Example: TCAS Means Thesis & Capstone Archiving System With Knowledge-Based Referencing Chatbot'
                                            required
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="form-group" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                                    <button className='btn btn-danger' style={{ width: '100px' }} type='button' onClick={() => setIsEditChatbot(false)}>Cancel</button>
                                    <button className='btn btn-primary' style={{ width: '100px' }} type='submit'>Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* -----------------------DELETE CONFIRMATION---------------------- */}
            {isDeleteChatbot && (
                <div className="popup">
                    <div className="popup-body student-body" onClick={(e) => e.stopPropagation()} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', borderRadius: '5px', animation: isDeleteChatbot ? 'animateCenter 0.3s linear' : 'closeAnimateCenter 0.3s linear' }}>

                        <div className="popup-edit">
                            <h5>Delete?</h5>
                        </div>
                        <hr />
                        <form onSubmit={handleDeleteChatbot}>
                            <div className='form-div'>
                                <span>Are you sure you wan't to Delete {deleteChatbotData.keyword}?</span>
                            </div>

                            <div style={{ justifyContent: 'space-between', marginTop: '25px', display: 'flex' }}>
                                <button className='btn btn-danger' type='button' style={{ width: '80px' }} onClick={() => setIsDeleteChatbot(false)}>Cancel</button>
                                <button className='btn btn-primary' type='submit' style={{ width: '80px' }}>Delete</button>
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

export default ChatbotKnowledge
