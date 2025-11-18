import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const {token}  = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [enrolledCourses, setEnrolledCourses] = useState(null);


    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error) {
            //console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
    },[]);


  return (
    <>
    <div className="text-3xl text-white font-bold">Enrolled Courses</div>
    {!enrolledCourses ? (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    ) : !enrolledCourses.length ? (
      <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
        You have not enrolled in any course yet.
        {/* TODO: Modify this Empty State */}
      </p>
    ) : (
      <div className="my-8 text-richblack-5">
        {/* Headings */}
        <div className=" hidden xs470:flex text-white font-bold rounded-t-lg bg-richblack-700 ">
          <p className="w-[45%] px-5 py-3">Course Name</p>
          <p className=" w-1/4 px-2 py-3">Duration</p>
          <p className="flex-1 px-2 py-3">Progress</p>
        </div>
        {/* Course Names */}
        {enrolledCourses.map((course, i, arr) => (
            <div
              key={i}
              className={`border border-white p-3 rounded-lg xs470:rounded-none xs470:border-0 xs470:border-b ${
                i === arr.length - 1 ? "xs470:rounded-b-lg" : ""
              }`}
            >

              {/* ======= MOBILE VIEW (<470px) - CARD LAYOUT ======= */}
              <div className="flex flex-col gap-3 xs470:hidden">

                {/* Thumbnail + Description Row */}
                <div
                  className="flex items-start gap-3 cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  <div className="flex flex-col">
                    <p className="font-semibold text-white">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.description.length > 60
                        ? `${course.description.slice(0, 60)}...`
                        : course.description}
                    </p>
                  </div>
                </div>

                {/* Duration */}
                <p className="text-sm text-richblack-200">
                  Duration: <span className="text-richblack-5">{course?.totalDuration}</span>
                </p>

                {/* Progress */}
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>

              </div>

              {/* ======= DESKTOP VIEW (>=470px) - ORIGINAL LAYOUT ======= */}
              <div className="hidden xs470:flex items-center">
                <div
                  className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="h-14 w-14 rounded-lg  object-cover"
                  />
                  <div className="flex max-w-xs flex-col gap-2">
                    <p className="font-semibold text-white">{course.courseName}</p>
                    <p className="text-xs text-richblack-300">
                      {course.description.length > 50
                        ? `${course.description.slice(0, 50)}...`
                        : course.description}
                    </p>
                  </div>
                </div>

                <div className="w-1/4 px-2 py-3">{course?.totalDuration}</div>

                <div className="flex w-1/4 flex-col gap-2 px-2 py-3">
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            </div>
        ))}

      </div>
    )}
  </>
  )
}

export default EnrolledCourses
