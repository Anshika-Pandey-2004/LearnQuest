// import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
// import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
// import { BigPlayButton, Player } from "video-react"

// import 'video-react/dist/video-react.css';

// import {AiFillPlayCircle} from "react-icons/ai"
// import IconBtn from '../../common/IconBtn';

// const VideoDetails = () => {
//     const {courseId, sectionId, subSectionId} = useParams();
//   const navigate = useNavigate(); 
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const playerRef = useRef();
//   const {token} = useSelector((state)=>state.auth);
//   const {courseSectionData, courseEntireData, completedLectures} = useSelector((state)=>state.viewCourse);
//   const [previewSource, setPreviewSource] = useState("")
//   const [videoData, setVideoData] = useState([]);
//   const [videoEnded, setVideoEnded] = useState(false);
//   const [loading, setLoading] = useState(false);
    
//   useEffect(() => {
//     const setVideoSpecificDetails = () => {
//         // //console.log("In VideoDetails, courseSectionData",courseSectionData)
//         if(!courseSectionData.length)
//             return;
//         if(!courseId && !sectionId && !subSectionId) {
//             navigate("/dashboard/enrolled-courses");
//         }
//         else {
//             //let's assume k all 3 fields are present

//             const filteredData = courseSectionData.filter(
//                 (course) => course._id === sectionId
//             )

//             const filteredVideoData = filteredData?.[0].subSection.filter(
//                 (data) => data._id === subSectionId
//             )

//             setVideoData(filteredVideoData[0]);
//             setPreviewSource(courseEntireData.thumbnail)
//             setVideoEnded(false);

//         }
//     }
//     setVideoSpecificDetails();
//   }, [courseSectionData, courseEntireData, location.pathname])
  
//   const isFirstVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//     )

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
//         (data) => data._id === subSectionId
//     )
//     if(currentSectionIndex === 0 && currentSubSectionIndex === 0) {
//         return true;
//     }
//     else {
//         return false;
//     }
//   } 

//   const isLastVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//     )

//     const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
//         (data) => data._id === subSectionId
//     )

//     if(currentSectionIndex === courseSectionData.length - 1 &&
//         currentSubSectionIndex === noOfSubSections - 1) {
//             return true;
//         }
//     else {
//         return false;
//     }


//   }

//   const goToNextVideo = () => {
//     const currentSectionIndex = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//     )

//     const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
//         (data) => data._id === subSectionId
//     )

//     if(currentSubSectionIndex !== noOfSubSections - 1) {
//         //same section ki next video me jao
//         const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
//         //next video pr jao
//         navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
//     }
//     else {
//         //different section ki first video
//         const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
//         const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
//         ///iss voide par jao 
//         navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
//     }
//   }

//   const goToPrevVideo = () => {

//     const currentSectionIndex = courseSectionData.findIndex(
//         (data) => data._id === sectionId
//     )

//     const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length;

//     const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex(
//         (data) => data._id === subSectionId
//     )

//     if(currentSubSectionIndex != 0 ) {
//         //same section , prev video
//         const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1];
//         //iss video par chalge jao
//         navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
//     }
//     else {
//         //different section , last video
//         const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
//         const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
//         const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id;
//         //iss video par chalge jao
//         navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)

//     }


//   }

//   const handleLectureCompletion = async() => {

//     ///dummy code, baad me we will replace it witht the actual call
//     setLoading(true);
//     //PENDING - > Course Progress PENDING
//     const res = await markLectureAsComplete({courseId: courseId, subSectionId: subSectionId}, token);
//     //state update
//     if(res) {
//         dispatch(updateCompletedLectures(subSectionId)); 
//     }
//     setLoading(false);

//   }
//   return (
//     <div className="flex flex-col gap-5 text-white">
//       {
//         !videoData ? (<img
//           src={previewSource}
//           alt="Preview"
//           className="h-full w-full rounded-md object-cover"
//         />)
//         : (
//             <Player
//                 ref = {playerRef}
//                 aspectRatio="16:9"
//                 playsInline
//                 onEnded={() => setVideoEnded(true)}
//                 src={videoData?.videoUrl}
//                  >

//                 <BigPlayButton position="center" />     

//                 {
//                     videoEnded && (
//                         <div style={{
//                             backgroundImage:
//                             "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
//                             }}
//                         className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
//                         >
//                             {
//                                 !completedLectures.includes(subSectionId) && (
//                                     <IconBtn 
//                                         disabled={loading}
//                                         onclick={() => handleLectureCompletion()}
//                                         text={!loading ? "Mark As Completed" : "Loading..."}
//                                         customClasses="text-xl max-w-max px-4 mx-auto"
//                                     />
//                                 )
//                             }

//                             <IconBtn 
//                                 disabled={loading}
//                                 onclick={() => {
//                                     if(playerRef?.current) {
//                                         playerRef.current?.seek(0);
//                                         setVideoEnded(false);
//                                     }
//                                 }}
//                                 text="Rewatch"
//                                 customClasses="text-xl max-w-max px-4 mx-auto mt-2"
//                             />

//                             <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
//                                 {!isFirstVideo() && (
//                                     <button
//                                     disabled={loading}
//                                     onClick={goToPrevVideo}
//                                     className='blackButton'
//                                     >
//                                         Prev
//                                     </button>
//                                 )}
//                                 {!isLastVideo() && (
//                                     <button
//                                     disabled={loading}
//                                     onClick={goToNextVideo}
//                                     className='blackButton'>
//                                         Next
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     )
//                 }
//             </Player>
//         )
//       }
//       <h1 className="mt-4 text-3xl font-semibold">
//         {videoData?.title}
//       </h1>
//       <p className="pt-2 pb-6">
//         {videoData?.description}
//       </p>
//     </div>
//   )
// }

// export default VideoDetails







import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";
import { useOutletContext } from "react-router-dom";

import {
  markLectureAsComplete,
} from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

import "video-react/dist/video-react.css";
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { setReviewModal } = useOutletContext();


  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [previewSource, setPreviewSource] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openSectionId, setOpenSectionId] = useState(sectionId);  


  // ---------------------------------------------------------
  // Load current video details whenever URL changes
  // ---------------------------------------------------------
  useEffect(() => {
    if (!courseSectionData.length || !courseEntireData) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    // find section
    const currentSection = courseSectionData.find(
      (sec) => sec._id === sectionId
    );
    if (!currentSection) return;

    // find subsection
    const currentSubSection = currentSection.subSection.find(
      (sub) => sub._id === subSectionId
    );

    setVideoData(currentSubSection || null);
    setPreviewSource(courseEntireData.thumbnail);
    setVideoEnded(false);
  }, [sectionId, subSectionId, courseSectionData, courseEntireData]);

  useEffect(() => {
      setOpenSectionId(sectionId);
    }, [sectionId]);


  // ---------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------
  const getCurrentIndexes = () => {
    const sIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );
    const ssIndex = courseSectionData[sIndex]?.subSection.findIndex(
      (sub) => sub._id === subSectionId
    );
    return { sIndex, ssIndex };
  };

  const isFirstVideo = () => {
    const { sIndex, ssIndex } = getCurrentIndexes();
    return sIndex === 0 && ssIndex === 0;
  };

  const isLastVideo = () => {
    const { sIndex, ssIndex } = getCurrentIndexes();
    const lastSection = sIndex === courseSectionData.length - 1;
    const lastSub =
      ssIndex === courseSectionData[sIndex].subSection.length - 1;
    return lastSection && lastSub;
  };

  // ---------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------
  const goToNextVideo = () => {
    const { sIndex, ssIndex } = getCurrentIndexes();
    const section = courseSectionData[sIndex];

    // Case 1: go to next subsection in same section
    if (ssIndex < section.subSection.length - 1) {
      const nextId = section.subSection[ssIndex + 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextId}`
      );
      return;
    }

    // Case 2: go to first subsection of next section
    const nextSection = courseSectionData[sIndex + 1];
    const nextId = nextSection.subSection[0]._id;
    navigate(
      `/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextId}`
    );
  };

  const goToPrevVideo = () => {
    const { sIndex, ssIndex } = getCurrentIndexes();

    // Case 1: previous subsection in same section
    if (ssIndex > 0) {
      const prevId =
        courseSectionData[sIndex].subSection[ssIndex - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevId}`
      );
      return;
    }

    // Case 2: last subsection of previous section
    const prevSection = courseSectionData[sIndex - 1];
    const prevSubList = prevSection.subSection;
    const prevId = prevSubList[prevSubList.length - 1]._id;

    navigate(
      `/view-course/${courseId}/section/${prevSection._id}/sub-section/${prevId}`
    );
  };

  // ---------------------------------------------------------
  // Mark Completed
  // ---------------------------------------------------------
  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId, subSectionId },
      token
    );
    if (res) dispatch(updateCompletedLectures(subSectionId));
    setLoading(false);
  };

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <div className="flex flex-col gap-5 text-white">
      {/* ---------------- Video Player or Preview Image ---------------- */}
      {!videoData?.videoUrl ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          src={videoData.videoUrl}
          onEnded={() => setVideoEnded(true)}
        >
          <BigPlayButton position="center" />

          {/* Overlay after video ends */}
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0,0,0), rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
              }}
              className="absolute inset-0 z-[100] grid place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={loading ? "Loading..." : "Mark As Completed"}
                  customClasses="
                    text-base sm:text-lg md:text-xl 
                    px-3 sm:px-4 
                    py-2 
                    mx-auto
                    "

                />
              )}

              <IconBtn
                onclick={() => {
                  playerRef.current?.seek(0);
                  setVideoEnded(false);
                }}
                text="Rewatch"
                customClasses="
                    text-base sm:text-lg md:text-xl 
                    px-3 sm:px-4 py-2 
                    mx-auto mt-2
                    "
              />

              <div className="mt-10 flex justify-center gap-x-3 text-base sm:text-lg md:text-xl">

                {!isFirstVideo() && (
                  <button onClick={goToPrevVideo} className="blackButton px-3 py-2 text-sm sm:text-base md:text-lg">
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button onClick={goToNextVideo} className="blackButton px-3 py-2 text-sm sm:text-base md:text-lg">
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      {/* MOBILE ONLY INFO SECTION */}
      <div className="block sm:hidden px-3 mt-4">

        {/* Course Name */}
        <h2 className="text-2xl font-bold mb-4">
          {courseEntireData?.courseName}
        </h2>

        {/* SECTIONS DROPDOWN */}
        <details className="bg-richblack-700 rounded-lg p-3 mb-4">
          <summary className="cursor-pointer text-lg font-semibold">
            Sections
          </summary>

          <div className="mt-3">

            {courseSectionData.map((sec) => (
              <details
                key={sec._id}
                open={openSectionId === sec._id}   // <-- controlled open state
                onClick={(e) => {
                  e.preventDefault(); // prevent default toggle
                  setOpenSectionId(openSectionId === sec._id ? null : sec._id);
                }}
                className="bg-richblack-800 rounded px-3 py-2 mb-2"
              >
                {/* Section Title */}
                <summary className="cursor-pointer font-semibold text-richblack-5">
                  {sec.sectionName}
                </summary>

                {/* Subsections */}
                <div className="mt-2 space-y-2">
                  {sec.subSection.map((lec) => (
                    <div
                      key={lec._id}
                      onClick={() =>
                        navigate(
                          `/view-course/${courseId}/section/${sec._id}/sub-section/${lec._id}`
                        )
                      }
                      className={`
                        p-2 rounded text-sm cursor-pointer
                        ${
                          lec._id === subSectionId
                            ? "bg-yellow-200 text-richblack-900 font-semibold"
                            : "bg-richblack-900 text-richblack-300"
                        }
                      `}
                    >
                      {lec.title}
                    </div>
                  ))}
                </div>

              </details>
            ))}

          </div>
        </details>

        {/* CURRENT LECTURE TITLE */}
        <h3 className="text-xl font-semibold text-white mb-2">
          {videoData?.title}
        </h3>

        {/* CURRENT LECTURE DESCRIPTION */}
        <p className="text-richblack-300 text-sm mb-4">
          {videoData?.description}
        </p>

        {/* ADD REVIEW BUTTON */}
        <button
          onClick={() => setReviewModal(true)}
          className="yellowButton w-full"
        >
          Add Review
        </button>

      </div>




      {/* ---------------- Title + Description ---------------- */}
      <h1 className="hidden sm:block mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="hidden sm:block pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
