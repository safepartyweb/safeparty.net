"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef } from "react";

import "swiper/css";

const messages = [
  "Save 20% off first order",
  "Free delivery on orders over $200",
  "2-3 business days shipping Canada wide",
];

export default function AnnouncementSlider() {
  const swiperRef = useRef(null);

  return (
    <div className="announcement-bar mt-4">
      <button
        type="button"
        className="announcement-arrow"
        aria-label="Previous announcement"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        &#10094;
      </button>

      <div className="announcement-slider">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1}
          loop
          speed={500}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {messages.map((message) => (
            <SwiperSlide key={message}>
              <p className="text-sm md:text-lg">{message}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        type="button"
        className="announcement-arrow"
        aria-label="Next announcement"
        onClick={() => swiperRef.current?.slideNext()}
      >
        &#10095;
      </button>

      <style jsx>{`
        .announcement-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px 12px;
          background: #111827;
          color: #fff;
        }

        .announcement-slider {
          width: min(100%, 600px);
          min-width: 0;
          text-align: center;
          overflow: hidden;
        }

        .announcement-slider p {
          margin: 0;
          line-height: 1.5;
        }

        .announcement-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border: none;
          border-radius: 50%;
          background: transparent;
          color: #fff;
          cursor: pointer;
          font-size: 13px;
        }

        .announcement-arrow:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}