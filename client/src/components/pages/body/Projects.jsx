import React, { useContext } from 'react';
import Header from '../Header';
import { PublicContext } from '../../Context/PublicContext';
import { backendUrl } from '../../../utils/Services';
import { useNavigate } from 'react-router-dom';

function Projects() {

    const navigate = useNavigate();

    const { archiveFiles, publicLoading } = useContext(PublicContext);

    document.title = "Projects";

    return (
        <>
            <Header />

            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0' }}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="content py-2">
                            <div className="col-12">
                                <div className="card card-outline card-primary shadow rounded-0">
                                    <div className="card-body rounded-0">
                                        <h2>Archive List</h2>
                                        <hr className="bg-navy" />
                                        <div className="list-group">
                                            {archiveFiles && archiveFiles.map(item => (
                                                item.status === "Published" && (
                                                    <div onClick={() => navigate(`/view-project/${1000 + item.id}`)} className="text-decoration-none text-dark list-group-item list-group-item-action" style={{ cursor: 'pointer' }}>
                                                        <div className="row">
                                                            <div className="col-lg-4 col-md-5 col-sm-12 text-center">
                                                                <img src={`${backendUrl}/${item.image_banner}`} className="banner-img img-fluid bg-gradient-dark" alt="Banner Image" />
                                                            </div>
                                                            <div className="col-lg-8 col-md-7 col-sm-12">
                                                                <h3 className="text-navy"><b>{item.project_title}</b></h3>
                                                                <small className="text-muted">By <b className="text-info">{item.members}</b></small>
                                                                <p className="truncate">{(item.abstract).slice(0, 480) + '...'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                    <div className="card-footer clearfix rounded-0">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-md-6"><span className="text-muted">Display Items: 3</span></div>
                                                <div className="col-md-6">
                                                    <ul className="pagination pagination-sm m-0 float-right">
                                                        <li className="page-item"><a className="page-link" href="./?page=projects&p=0" disabled>«</a></li>
                                                        <li className="page-item"><a className="page-link active" href="./?page=projects&p=1">1</a></li>
                                                        <li className="page-item"><a className="page-link" href="./?page=projects&p=2" disabled>»</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Projects
