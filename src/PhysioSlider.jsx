import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const physioTypes = [
  {
    name: "Manual Therapy",
    image: "/images/manual-therapy.jpg",
    description:
      "Hands-on techniques to improve mobility, reduce pain, and restore function.",
  },
  {
    name: "Electrotherapy",
    image: "/images/electrotherapy.jpg",
    description:
      "Using electrical energy to reduce pain, improve circulation, and enhance healing.",
  },
  {
    name: "Hydrotherapy",
    image: "/images/Hydrotherapy.jpg",
    description:
      "Water-based treatments for rehabilitation, relaxation, and recovery.",
  },
  {
    name: "Sports Physiotherapy",
    image: "/images/sportstherapy.jpg",
    description:
      "Specialized therapy for sports-related injuries and performance improvement.",
  },
];

export default function PhysioSlider() {
  const [selectedPhysio, setSelectedPhysio] = useState(null);

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800">
        Types of Physiotherapy
      </h2>
      <p className="text-center text-gray-600 mt-2">
        Click on a physiotherapy type to learn more.
      </p>

      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="mt-6"
      >
        {physioTypes.map((physio, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-xl"
              onClick={() => setSelectedPhysio(physio)}
            >
              <img
                src={physio.image}
                alt={physio.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-xl font-semibold text-gray-800 mt-3 text-center">
                {physio.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Full-Screen Blog Modal */}
      {selectedPhysio && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg max-w-5xl w-full p-6 md:flex md:items-start overflow-y-auto max-h-[90vh] relative">
            <img
              src={selectedPhysio.image}
              alt={selectedPhysio.name}
              className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-lg"
            />
            <div className="md:ml-6 mt-4 md:mt-0">
              <h3 className="text-3xl font-bold text-gray-800">
                {selectedPhysio.name}
              </h3>
              <p className="text-gray-600 mt-3 text-lg">
                {selectedPhysio.description}
              </p>

              {/* Add more blog details if needed here */}
              <p className="mt-4 text-gray-500">
                Physiotherapy is a treatment to restore, maintain, and make the most of a
                patient's mobility, function, and well-being. It helps through physical
                rehabilitation, injury prevention, and health and fitness.
              </p>

              {/* Close Button */}
              <button
                className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={() => setSelectedPhysio(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
