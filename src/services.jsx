import { Link } from "react-router-dom";

export default function Services() {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800">Our Services</h2>
      <p className="text-center text-gray-600 mt-2">
        Choose the best physiotherapy service for your needs.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Clinic Visit */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="/images/ClinicVisit.jpg"
            alt="Clinic Visit"
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">Clinic Visit</h3>
          <p className="text-gray-600 mt-2">Visit our expert physiotherapists at our clinic.</p>
          <Link
            to="/book"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </Link>
        </div>

        {/* Home Visit */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="/images/HomeVisit.jpg"
            alt="Home Visit"
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">Home Visit</h3>
          <p className="text-gray-600 mt-2">Get personalized care at your home.</p>
          <Link
            to="/book"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </Link>
        </div>

        {/* Digital Physio Session */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <img
            src="/images/digitalphiso.jpg"
            alt="Digital Session"
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold text-gray-800 mt-4">Digital Physio Session</h3>
          <p className="text-gray-600 mt-2">Consult our specialists online anytime.</p>
          <Link
            to="/book"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
