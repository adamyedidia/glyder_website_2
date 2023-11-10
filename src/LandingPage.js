import React from 'react';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="page-container" style={{ textAlign: 'center', color: 'white' }}>
            <Typography variant="h1">
                Glyder Games
            </Typography>
            <br />
            <br /> 
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />            
            <br />
            <br />
            <br />
            <br />
            <br />            
            <br />
            <br />
            <Typography variant="h2">
                We specialize in developing strategy and party games. More information to come soon!
            </Typography>
            <br /> 
            <Link to="/contact" style={{ color: 'white' }}>
                <Typography variant="h3">
                    Contact Us
                </Typography>
            </Link>
        </div>
    )
}