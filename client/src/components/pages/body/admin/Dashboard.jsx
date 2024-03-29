import React, { useContext } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';

// react icons
import { FaThList } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { RiNewspaperLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FiArchive } from "react-icons/fi";
import { TbArchiveOff } from "react-icons/tb";

import { AdminContext } from '../../../Context/AdminContext';
import { PublicContext } from '../../../Context/PublicContext';

function Dashboard() {
  document.title = "Dashboard";

  const { departmentToSearch, courseList, schoolYearList, usersList, usersRequestList } = useContext(AdminContext);
  const { archiveFiles } = useContext(PublicContext);

  const navigate = useNavigate();

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

        <div style={{ marginLeft: '20px', textAlign: 'center', marginBottom: '20px' }}>
          <h1 className="m-0">Welcome to Thesis and Capstone Archiving System</h1>
          <hr />
        </div>

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{departmentToSearch && departmentToSearch.filter(item => item.status === 'Active').length}</h3>
                    <p>Active Department</p>
                  </div>
                  <div className="icon">
                    <i><FaThList /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/department')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{courseList && courseList.filter(item => item.status === 'Active').length}<sup style={{ fontSize: 20 }}></sup></h3>
                    <p>Active Courses</p>
                  </div>
                  <div className="icon">
                    <i><RiNewspaperLine /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/courses')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{schoolYearList && schoolYearList.filter(item => item.status === 'Active').length}</h3>
                    <p>Active School Year</p>
                  </div>
                  <div className="icon">
                    <i><MdDateRange /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/school-year')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{usersRequestList && usersRequestList.filter(item => item.status === 'Pending').length}</h3>
                    <p>Pending Request (View File)</p>
                  </div>
                  <div className="icon">
                    <i><FaUsers /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/request-user')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{archiveFiles && archiveFiles.filter(item => item.status === 'Published').length}</h3>
                    <p>Publish Projects</p>
                  </div>
                  <div className="icon">
                    <i><FiArchive /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/archive-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{archiveFiles && archiveFiles.filter(item => item.status === 'UnPublish').length}</h3>
                    <p>UnPublish Projects</p>
                  </div>
                  <div className="icon">
                    <i><TbArchiveOff /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/archive-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{archiveFiles?.filter(item => item.confirmation === 0).length || 0}</h3>
                    <p>Pending Request (Upload File)</p>
                  </div>
                  <div className="icon">
                    <i><FaUsers /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/document-request')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{usersList && usersList.length}</h3>
                    <p>Users</p>
                  </div>
                  <div className="icon">
                    <i><FaUsers /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/users')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Dashboard;
