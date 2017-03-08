import React from 'react';
import { Link } from 'react-router';

const NotFound = () => (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>Oops!</h1>
                        <h2>404 Not Found</h2>
                        <div className="error-details">
                            Sorry, an error has occurred: Requested page not found!
                        </div>
                        <div className="error-actions">
                            <Link to="/" className="btn btn-primary btn-lg">
                                <i className="fa fa-home" /> Take Me Home
                            </Link>
                            <Link to="/" className="btn btn-default btn-lg" >
                                <i className="fa fa-envelope" /> Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);

export default NotFound;
