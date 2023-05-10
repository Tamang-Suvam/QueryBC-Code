import React from 'react'
import {
    Link
} from "react-router-dom";

export const NavbarDoctor = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fs-3">
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Back Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/query_page">Query</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/ipfs_page">IPFS Page</Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default NavbarDoctor;
