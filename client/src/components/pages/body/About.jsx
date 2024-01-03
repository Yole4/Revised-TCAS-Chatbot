import React, { useContext } from 'react';
import Header from '../Header';
import { PublicContext } from '../../Context/PublicContext';

function About() {

    const {settingsData, publicLoading} = useContext(PublicContext);

    document.title = "About Us";

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
                                                <dd className="pr-4">{settingsData && settingsData.email}</dd>
                                                <dt className="text-muted"><i className="fa fa-phone" /> Contact #</dt>
                                                <dd className="pr-4">{settingsData && settingsData.contact_number}</dd>
                                                <dt className="text-muted"><i className="fa fa-map-marked-alt" /> Location</dt>
                                                <dd className="pr-4">{settingsData && settingsData.address}</dd>
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
                                                <p style={{ marginRight: 0, marginBottom: 15, marginLeft: 0, padding: 0, textAlign: 'justify' }}>{settingsData && settingsData.about_us}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {publicLoading && (
                <div className="popup">
                    <button class="btn btn-primary" type="button" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} disabled>
                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" style={{ marginRight: '10px' }}></span>
                        Loading...
                    </button>
                </div>
            )}
        </>
    )
}

export default About
