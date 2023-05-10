import React from 'react'
import {
    Link
} from "react-router-dom";

export const NavbarPatient = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fs-2">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Back Home</Link>
                </li>
                {/* <li className="nav-item">
                <Link className="nav-link display-6" to="/patientquery_page">Query</Link>
                </li> */}
            </ul>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default NavbarPatient;
