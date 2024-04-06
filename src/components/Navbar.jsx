
// // 
import React, { useState } from 'react'
import { IoHome } from "react-icons/io5";
import { TbBrandRedux } from "react-icons/tb";
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaCartPlus } from "react-icons/fa";
import FilteredProducts from './FilteredProducts';

const Navbar = () => {
 
    // // This is for Showing FilterProducts components, if only when user is on Home page. In other page FilterProducts component is Hidden.
    const location = useLocation();
    const showFilterProducts = location.pathname === '/'

    // //useSelector is works as "Subscriber". It gives all data from state, When data is changed or updated.
    const productCount = useSelector(state => state.cart)

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: "20px", background: "linear-gradient(135deg, #00d2ef, #550120)", boxShadow: "20px 15px 17px 0px rgb(115 38 67)", position: "sticky", top: "-1px", width: "100%", borderRadius: "10px" }}>

            <span className='logo'><TbBrandRedux style={{ height: "60px", width: "60px", color: "rgb(112 0 137)", margin: "-10px 0px 0px 5px" }} /> <h1 style={{ margin: "-60px 0px 0px 75px", color: "rgb(112 0 137)" }}>Redux-Toolkit</h1> </span>

            <div style={{ display: "flex", justifyContent: "end", width: "75%" }}>


                {/* <div style={{ margin: "10px 40px 10px 0px" }}>
                    <FilteredProducts />
                </div> */}

                {showFilterProducts && <div style={{ margin: "10px 40px 10px 0px" }}>
                    <FilteredProducts />
                </div> }


                <IoHome style={{ height: "30px", width: "30px", marginTop: "15px", color: "#f3075e" }} />
                <Link className='navLink' to='/'><h3>Home</h3></Link>


                <div style={{ display: "flex", marginLeft: "20px" }}>
                    <span style={{ color: "#00d6ff", marginRight: "-20px" }}>{productCount.length}</span>
                    <FaCartPlus style={{ height: "30px", width: "30px", margin: "17px -17px 0px 0px", color: "#f3075e" }} />
                    <Link className='navLink' to='/cart'><h3 style={{ marginLeft: "20px" }}>Cart</h3></Link>
                </div>


            </div>

        </div>
    )
}

export default Navbar
