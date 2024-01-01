import React from 'react';
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import jose from '../../assets/images/jose.jpg';

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <Header />

            <div className="content-wrapper pt-5" style={{ color: 'black', marginLeft: '0' }}>
                <div id="header" style={{ backgroundImage: `url(${jose})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center'}} className="shadow mb-4">
                {/* <div id="header" style={{ backgroundImage: systemCover && coverUrl ? `url(${coverUrl})` : 'none', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center center' }} className="shadow mb-4"> */}

                    <div className="d-flex justify-content-center h-100 w-100 align-items-center flex-column px-3">
                        <h1 className="w-100 text-center site-title" style={{ marginBottom: '20px' }}>System Name</h1>
                        <a href="#" onClick={() => navigate('/projects')} className="btn btn-lg btn-light rounded-pill explore" id="enrollment"><b>Explore Projects</b></a>
                    </div>
                </div>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="col-lg-12 py-5">
                            <div className="contain-fluid">
                                <div className="card card-outline card-navy shadow rounded-0">
                                    <div className="card-body rounded-0">
                                        <div className="container-fluid">
                                            <h3 className="text-center">Welcome</h3>
                                            <hr />
                                            <div className="welcome-content">
                                                <p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0, textAlign: 'justify' }}>welcome message</p></div>
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

export default Home
