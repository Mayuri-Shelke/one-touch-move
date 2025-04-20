import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PhysioSearchPage() {
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [physios, setPhysios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const serviceType = searchParams.get('type') || '';

  useEffect(() => {
    // Load from URL params if present
    const urlLocation = searchParams.get('location');
    if (urlLocation) setLocation(urlLocation);
  }, [searchParams]);

  const handleSearch = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    try {
      let q = query(collection(db, 'physiotherapists'));
      
      // Base query
      const conditions = [
        where('location', '==', location.toLowerCase())
      ];

      // Add service type filter if specified
      if (serviceType) {
        conditions.push(where('services', 'array-contains', serviceType));
      }

      // Add specialization filter if specified
      if (specialization) {
        conditions.push(where('specialization', '==', specialization));
      }

      q = query(q, ...conditions);
      
      const querySnapshot = await getDocs(q);
      
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure consistent data structure
        name: doc.data().name || 'Dr. Unknown',
        specialization: doc.data().specialization || 'General Physiotherapy',
        experience: doc.data().experience || 0
      }));

      setPhysios(results);
    } catch (error) {
      console.error("Search failed:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {serviceType ? `Find ${serviceType} Specialists` : 'Find Physiotherapists'}
        </h1>
        
        {serviceType && (
          <p className="text-gray-600 mb-6">
            Showing professionals offering <span className="font-semibold">{serviceType}</span> services
          </p>
        )}

        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or area"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Specializations</option>
                <option value="Sports">Sports Injury</option>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Neurological">Neurological</option>
                <option value="Pediatric">Pediatric</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Searching...' : 'Find Physios'}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {physios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {physios.map((physio) => (
                  <motion.div
                    key={physio.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <div 
                      className="border rounded-xl p-5 hover:shadow-md cursor-pointer h-full bg-white"
                      onClick={() => navigate(`/physio/${physio.id}?service=${serviceType}`)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-lg p-3 text-2xl">
                          👨‍⚕️
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold capitalize">{physio.name}</h3>
                          <p className="text-blue-600 capitalize">{physio.specialization}</p>
                          <div className="mt-3 space-y-2 text-sm">
                            <p className="flex items-center">
                              <span className="text-gray-500 mr-2">📍</span>
                              <span className="capitalize">{physio.location}</span>
                            </p>
                            <p className="flex items-center">
                              <span className="text-gray-500 mr-2">⭐</span>
                              <span>{physio.rating || 'Not rated yet'}</span>
                            </p>
                            <p className="flex items-center">
                              <span className="text-gray-500 mr-2">🕒</span>
                              <span>{physio.experience} years experience</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      {serviceType && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            {serviceType} Available
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              location && (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No physiotherapists found in {location}
                  </h3>
                  <p className="text-gray-500">
                    {serviceType && `for ${serviceType} services`}
                    {specialization && ` specializing in ${specialization}`}
                  </p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}