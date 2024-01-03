import React from 'react';

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

function Dashboard() {
  document.title = "Dashboard";

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
                    <h3>3</h3>
                    {/* <h3>{departmentList && departmentList.filter(item => item.status === 'Active').length}</h3> */}
                    <p>Active Department</p>
                  </div>
                  <div className="icon">
                    <i><FaThList /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/department-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>5<sup style={{ fontSize: 20 }}></sup></h3>
                    {/* <h3>{coursesList && coursesList.filter(item => item.status === 'Active').length}<sup style={{ fontSize: 20 }}></sup></h3> */}
                    <p>Active Courses</p>
                  </div>
                  <div className="icon">
                    <i><RiNewspaperLine /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/curriculumn-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>5</h3>
                    {/* <h3>{schoolYearList && schoolYearList.filter(item => item.status === 'Active').length}</h3> */}
                    <p>Active School Year</p>
                  </div>
                  <div className="icon">
                    <i><MdDateRange /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/department-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>6</h3>
                    {/* <h3>{requestedUsers && requestedUsers.filter(item => item.status === 'Pending').length}</h3> */}
                    <p>Pending Request User</p>
                  </div>
                  <div className="icon">
                    <i><FaUsers /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/student-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>4</h3>
                    {/* <h3>{archiveList && archiveList.filter(item => item.status === 'Published').length}</h3> */}
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
                    <h3>66</h3>
                    {/* <h3>{archiveList && archiveList.filter(item => item.status === 'UnPublish').length}</h3> */}
                    <p>UnPublish Projects</p>
                  </div>
                  <div className="icon">
                    <i><TbArchiveOff /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/archive-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>

              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>20</h3>
                    {/* <h3>{usersAccount && usersAccount.length}</h3> */}
                    <p>Users</p>
                  </div>
                  <div className="icon">
                    <i><FaUsers /></i>
                  </div>
                  <a href="#" className="small-box-footer" onClick={() => navigate('/users-list')}>More info <i className="fas fa-arrow-circle-right" /></a>
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
