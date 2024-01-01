import React from 'react';
import Header from '../Header';

function About() {
    return (
        <>
            <Header />

            <div className="content-wrapper pt-5 about-container" style={{ color: 'black', marginLeft: '0' }}>
                {/* Main content */}
                <section className="content ">
                    <div className="container">
                        <div className="col-12">
                            <div className="row my-5 ">
                                <div className="col-md-5">
                                    <div className="card card-outline card-navy rounded-0 shadow">
                                        <div className="card-header">
                                            <h4 className="card-title">Contact</h4>
                                        </div>
                                        <div className="card-body rounded-0">
                                            <dl>
                                                <dt className="text-muted"><i className="fa fa-envelope" /> Email</dt>
                                                <dd className="pr-4">Your@gmail.com</dd>
                                                <dt className="text-muted"><i className="fa fa-phone" /> Contact #</dt>
                                                <dd className="pr-4">234324324</dd>
                                                <dt className="text-muted"><i className="fa fa-map-marked-alt" /> Location</dt>
                                                <dd className="pr-4">My Location</dd>
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="card rounded-0 card-outline card-navy shadow">
                                        <div className="card-body rounded-0">
                                            <h2 className="text-center">About</h2>
                                            <center>
                                                <hr className="bg-navy border-navy w-25 border-2" />
                                            </center>
                                            <div>
                                                <p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0, textAlign: 'justify' }}>About us message</p>
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

export default About
