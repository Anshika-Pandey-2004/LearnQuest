import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

import { FaStar } from "react-icons/fa"
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const [expandedIndex, setExpandedIndex] = useState(null)
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
        if (data?.success) setReviews(data.data || [])
      } catch (err) {
        console.error("Failed to load reviews", err)
      }
    })()
  }, [])

  const toggleReadMore = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="text-white w-full">
      <div className="my-12 w-full">

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 1800, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          freeMode={true}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            const text = review?.review || ""
            const wordCount = text.split(" ").filter(Boolean).length

            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col justify-between bg-richblack-800 p-4 rounded-md h-[250px]">

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review.user.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName || "U"}`
                      }
                      alt="user"
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <div>
                      <h1 className="font-semibold text-richblack-5 text-sm">
                        {review?.user?.firstName} {review?.user?.lastName}
                      </h1>
                      <h2 className="text-[12px] text-richblack-400">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>

                  {/* Review Text — scrollable when expanded */}
                  <div
                    className={`text-richblack-25 text-[13px]  ${
                      expandedIndex === i
                        ? "overflow-y-auto h-[90px] pr-1 scrollbar-hide"
                        : "overflow-hidden h-[90px]"
                    }`}
                  >
                    {expandedIndex === i ? (
                      <p>{text}</p>
                    ) : (
                      <p>
                        {wordCount > truncateWords
                          ? text.split(" ").slice(0, truncateWords).join(" ") + "..."
                          : text}
                      </p>
                    )}

                    {wordCount > truncateWords && (
                      <button
                        onClick={() => toggleReadMore(i)}
                        className="text-yellow-100 font-semibold mt-1 hover:underline"
                      >
                        {expandedIndex === i ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-2">
                    <h3 className="text-yellow-100 font-semibold">
                      {review?.rating?.toFixed(1) || "0.0"}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review?.rating || 0}
                      size={18}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>

                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>

      </div>
    </div>
  )
}

export default ReviewSlider

