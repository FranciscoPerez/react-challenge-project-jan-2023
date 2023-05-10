import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import { useSelector } from 'react-redux';

const Nav = (props) => {
    const auth = useSelector(state => state.auth);

    return (
        <div className="nav-root">
            {auth.email &&
                <div className="user-strip">
                    <label className="nav-lable">{`Welcome back, ${auth.email}!`}</label>
                </div>}
            <div className="nav-strip">
                <Link to={"/order"} className="nav-link">
                    <div className="nav-link-style">
                        <label className="nav-label">Order Form</label>
                    </div>
                </Link>
                <Link to={"/view-orders"} className="nav-link" id="middle-link">
                    <div className="nav-link-style">
                        <label className="nav-label">View Orders</label>
                    </div>
                </Link>
                <Link to={"/login"} className="nav-link">
                    <div className="nav-link-style">
                        <label className="nav-label">Log Out</label>
                    </div>
                </Link>
            </div>
        </div>
        
    );
}

export default Nav;