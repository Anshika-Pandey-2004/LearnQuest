import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { sidebarLinks } from "../../../data/dashboard-links";
import { useEffect } from "react";


import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)


  // *********ABM***********
  const [isMobile, setIsMobile] = useState(window.innerWidth < 730);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 730);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  //******ABM**** */

  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
          ref={ref}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

    {/* ONLY VISIBLE ON MOBILE (<730px) ***********ABM******/}
    {isMobile && (
      <>
        <Link to="/dashboard/settings" onClick={() => setOpen(false)}>
          <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700">
            Settings
          </div>
        </Link>

        {user?.accountType === "Student" && (
          <>
            <Link to="/dashboard/enrolled-courses" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700">
                Enrolled Courses
              </div>
            </Link>

            <Link to="/dashboard/cart" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700">
                Cart
              </div>
            </Link>
          </>
        )}

        {user?.accountType === "Instructor" && (
          <>
            <Link to="/dashboard/add-course" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700">
                Add Course
              </div>
            </Link>

            <Link to="/dashboard/my-courses" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700">
                My Courses
              </div>
            </Link>
          </>
        )}
      </>
    )}


          <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  )
}