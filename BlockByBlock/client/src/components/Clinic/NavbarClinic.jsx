import React from 'react'
import {
    Link
} from "react-router-dom";
// navbar-expand-lg display-6 fw-normal
export const NavbarClinic = ({account}) => {
  return (
     <div> 
        {/* <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
            <div className="collapse navbar-collapse navbar-header" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Back Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/clinic_login">Login</Link>
                    </li>
                </ul>
           </div>
        </div>
        <ul className='nav navbar-nav'>
            <li className='nav-item'>
                <small className='text-white text-nowrap'>Clinic ID : {account}</small>
            </li>
        </ul>
        </nav> */}
        <nav class="py-3 px-3 navbar navbar-expand-lg navbar-dark bg-dark fs-3">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">Back Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/clinic_login">Login</Link>
                    </li>
                </ul>
            </div>
            <ul className='nav navbar-nav'>
            <li className='nav-item'>
                <small className='text-white text-nowrap'>Clinic ID : {account}</small>
            </li>
        </ul>
        </nav>
        <p>&nbsp;</p>      
    </div>     
  )
}

export default NavbarClinic;