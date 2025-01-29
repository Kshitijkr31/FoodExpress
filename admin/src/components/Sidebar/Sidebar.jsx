import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img className='addd' src={assets.add_icon} alt="" />
                <p className='ptags'>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img className='listt' src={assets.order_icon} alt="" />
                <p className='ptags'>List Items</p>
                </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img className='orderr' src={assets.order_icon} alt="" />
                <p className='ptags'>Orders</p>
                </NavLink>
        </div>
    </div>
  )
}

export default Sidebar