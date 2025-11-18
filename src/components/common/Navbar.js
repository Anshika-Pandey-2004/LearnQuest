import React, { useEffect } from 'react'
// import logo from "../../assets/Logo/Logo-Full-Light.png"
import logo from "../../assets/Logo/Logo-Full-myLight.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import {IoIosArrowDown} from "react-icons/io"
import {RxHamburgerMenu} from "react-icons/rx"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from '../common/ConfirmationModal'
import { logout } from "../../services/operations/authAPI"
import './loader.css'
// Ḍemo temporary data
// const subLinks = [
//     {
//         title: "Python",
//         link:"/catalog/python"
//     },
//     {
//         title: "Web Dev",
//         link:"/catalog/web-development"
//     },
// ];

const Navbar = () => {
    // //console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    
    const {token} = useSelector((state)=> state.auth);
    // //console.log("token in Navbar is",token)
    const {user} = useSelector((state)=> state.profile);
    // //console.log("User in Navbar is",user)
    const {cart} = useSelector((state)=> state.cart);
    const {totalItems} = useSelector((state)=> state.cart);
    const location = useLocation();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);



    const [subLinks, setSubLinks]  = useState([]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // //console.log("Printing Sublinks result:" , result);
            setSubLinks(result.data.data);
        }
        catch(error) {
            //console.log("Could not fetch the category list");
        }
    }

    
    useEffect( () => {
        fetchSublinks();
    },[] )

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
    
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Image */}
      <Link to="/">
        <img src={logo} alt='Website Logo' width={160} height={42} loading='lazy'/>
      </Link>

      {/* Nav Links */}
      <nav>
        <ul className=' hidden md:flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                                <p>{link.title}</p>
                                <IoIosArrowDown/>

                                <div className={`invisible absolute left-[50%] 
                                    translate-x-[-49%] ${subLinks.length ? "translate-y-[7%]" : "translate-y-[40%]"}
                                 top-[0%] z-50 
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]`}>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50' to={`catalog/${subLink.name}`} key={index}>
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<span className="loader"></span>)
                                }

                                </div>


                            </div>

                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                                
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>

        {/* Login/SignUp/Dashboard */}
        <div className='hidden md:flex gap-x-4 items-center'>
            {   
                user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className='relative pr-2'>
                        <AiOutlineShoppingCart className='text-2xl text-richblack-100 ' />
                        {
                            totalItems > 0 && (
                                <span className=' absolute -bottom-2 -right-0 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className='border  border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown />
            }
            
        </div>

         <div className='mr-4 md:hidden text-[#AFB2BF] scale-150  cursor-pointer'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <RxHamburgerMenu />  
         </div>   

         {/* *****ABM******HAMBURGERMENU*/}
         {/* MOBILE SIDEBAR */}
        <div
        className={`fixed top-0 right-0 h-full w-[260px] bg-richblack-900 text-richblack-25 p-6 
        z-50 border-l-2 border-yellow-50 backdrop-blur-md
        transform transition-transform duration-300 md:hidden
        ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >

        {/* Close Button */}
        <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 right-4 text-yellow-50 border border-yellow-50 
                    px-2 py-1 rounded-md text-lg"
        >
            ✕
        </button>

        {/* Yellow Divider */}
        <hr className="border-yellow-50 mt-14 mb-6" />

        {/* Mobile Nav Links */}
        <div className="flex flex-col gap-4">

            {NavbarLinks.map((link, idx) => (
            <div key={idx}>

                {/* ---- Catalog ---- */}
                {link.title === "Catalog" ? (() => {

                // Convert ALL sublink names to URL format
                const formattedSubs = subLinks.map(sub => ({
                    ...sub,
                    url: `/catalog/${sub.name.toLowerCase().replace(/\s+/g, "-")}`
                }));

                // Parent should be yellow if ANY child is active
                const isCatalogActive = formattedSubs.some(sub =>
                    matchRoute(sub.url)
                );

                return (
                    <details className="cursor-pointer" open={isCatalogActive}>
                    <summary
                        className={`flex items-center justify-between text-lg 
                        ${isCatalogActive ? "text-yellow-50" : "text-richblack-25"}`}
                    >
                        Catalog
                        <IoIosArrowDown
                        className={`${isCatalogActive ? "text-yellow-50" : "text-richblack-25"}`}
                        />
                    </summary>

                    <div className="mt-2 flex flex-col pl-3 gap-2">
                        {formattedSubs.map((sub, i) => (
                        <Link
                            key={i}
                            to={sub.url}
                            onClick={() => setIsMenuOpen(false)}
                            className={`${
                            matchRoute(sub.url)
                                ? "text-yellow-50"
                                : "text-richblack-200"
                            } hover:text-yellow-50`}
                        >
                            {sub.name}
                        </Link>
                        ))}
                    </div>
                    </details>
                );
                })() : (

                /* ---- Normal Links ---- */
                <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg ${
                    matchRoute(link.path)
                        ? "text-yellow-50"
                        : "text-richblack-25"
                    } hover:text-yellow-50`}
                >
                    {link.title}
                </Link>
                )}

            </div>
            ))}

        </div>

        {/* Auth Buttons */}
        <div className="mt-6 flex flex-col gap-3">
            {token === null && (
            <>
                <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="border border-yellow-50 text-yellow-50 p-2 text-center rounded-md"
                >
                Log in
                </Link>

                <Link
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="border border-yellow-50 text-yellow-50 p-2 text-center rounded-md"
                >
                Sign Up
                </Link>
            </>
            )}

                {/* ****ABM AGAIN TO PUT OPTION IN HAMBURGER */}
            {user && token !== null && (
            <div className="flex flex-col gap-3 text-richblack-25">

                {/* Dashboard */}
                <Link
                to="/dashboard/my-profile"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 p-2 hover:text-yellow-50"
                >
                My Profile
                </Link>

                {user?.accountType === "Student" && (
                <>
                    <Link
                    to="/dashboard/enrolled-courses"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 p-2 hover:text-yellow-50"
                    >
                    Enrolled Courses
                    </Link>

                    <Link
                    to="/dashboard/cart"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 p-2 hover:text-yellow-50"
                    >
                    Cart
                    </Link>
                </>
                )}

                {user?.accountType === "Instructor" && (
                <>
                    <Link
                    to="/dashboard/instructor"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 p-2 hover:text-yellow-50"
                    >
                    Dashboard
                    </Link>
                    
                    <Link
                    to="/dashboard/add-course"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 p-2 hover:text-yellow-50"
                    >
                    Add Course
                    </Link>

                    <Link
                    to="/dashboard/my-courses"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 p-2 hover:text-yellow-50"
                    >
                    My Courses
                    </Link>
                </>
                )}

                 {/* Settings */}
                <Link
                to="/dashboard/settings"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 p-2 hover:text-yellow-50"
                >
                    Settings
                </Link>   

                {/* Logout */}
                <button
                onClick={() => {
                    setIsMenuOpen(false);
                    setConfirmationModal({
                    text1: "Are you sure?",
                    text2: "You will be logged out from your account.",
                    btn1Text: "Logout",
                    btn2Text: "Cancel",
                    btn1Handler: () => {
                        dispatch(logout(navigate));
                        setConfirmationModal(null);
                    },
                    btn2Handler: () => {
                        setConfirmationModal(null);
                    }
                    });
                }}
                className="flex items-center gap-2 p-2 hover:text-yellow-50"
                >
                Logout
                </button>



            </div>
            )}

        </div>

        </div>


      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    </div>
  )
}

export default Navbar