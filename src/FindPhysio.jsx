import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import GoHomeButton from "./GoHomeButton";
export default function FindPhysio() {
  const [searchParams] = useSearchParams();  
  const selectedService = searchParams.get('type');
  const [location, setLocation] = useState('');
  const [physios, setPhysios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!location.trim()) return alert('Please enter your city or location.');

    setLoading(true);
    const physioRef = collection(db, 'physiotherapists');
    const snapshot = await getDocs(physioRef);

    const filtered = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(doc =>
        doc.services?.includes(selectedService) &&
        doc.location.toLowerCase().includes(location.toLowerCase())
      );

    setPhysios(filtered);
    setLoading(false);
  };

  const handleBookAppointment = (physio) => {
    navigate('/book-appointment', { state: { doctor: physio } });
  };

  return (
    <section className="container mx-auto px-4 py-10">
         <GoHomeButton />
      <h2 className="text-2xl font-bold mb-4">Find {selectedService} Physiotherapists  </h2>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter your city"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading physiotherapists...</p>}

      {/* Scrollable List */}
      <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
        {physios.length > 0 ? (
          physios.map((physio) => (
            <div
              key={physio.id}
              className="bg-white border rounded-xl shadow-sm p-4 flex items-start gap-4"
            >
              {/* Profile Pic */}
              <img
                src={physio.profilePic}
                alt={physio.name}
                className="w-32 h-32 object-cover rounded-lg border"
              />

              {/* Doctor Info + Actions */}
              <div className="flex-1">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{physio.name}</h3>
                    <p className="text-gray-600">{physio.specialization}</p>
                    <p className="text-sm text-gray-500">Experience: {physio.experience} years</p>
                    <p className="text-sm text-gray-500">Location: {physio.location}</p>
                    <p className="text-sm text-gray-500">Services: {physio.services?.join(', ')}</p>
                  </div>

                  <div className="flex flex-col gap-2 items-end sm:items-center">
                    <button
                      onClick={() => handleBookAppointment(physio)}
                      className="bg-blue-800 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Book Appointment
                    </button>
                    <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
                      Contact Clinic
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-gray-600 text-center">
              No physiotherapists found for this service and location.
            </p>
          )
        )}
      </div>
    </section>
  );
}
