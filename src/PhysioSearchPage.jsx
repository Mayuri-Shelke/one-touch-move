import { useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function PhysioSearchPage() {
  const [location, setLocation] = useState('');
  const [physios, setPhysios] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!location.trim()) return;
    
    setLoading(true);
    try {
      const q = query(
        collection(db, 'physiotherapists'),
        where('location', '==', location.toLowerCase())
      );
      const querySnapshot = await getDocs(q);
      
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name,
        specialization: doc.data().specialization,
        location: doc.data().location,
        experience: doc.data().experience,
        contact: doc.data().contact
      }));

      setPhysios(results);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Error searching physiotherapists");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto mb-8">
        <h1 className="text-3xl font-bold mb-4">Find a Physiotherapist</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter your location (e.g. Amravati)"
            className="flex-1 p-2 border rounded-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {physios.map((physio) => (
          <div 
            key={physio.id} 
            className="border rounded-lg p-4 hover:shadow-md cursor-pointer transition-shadow"
            onClick={() => navigate(`/physio/${physio.id}`)}
          >
            <h3 className="text-xl font-semibold capitalize">{physio.name}</h3>
            <p className="text-gray-600 capitalize">{physio.specialization}</p>
            <div className="mt-2 space-y-1">
              <p className="text-sm flex items-center">
                <span className="mr-1">📍</span>
                <span className="capitalize">{physio.location}</span>
              </p>
              <p className="text-sm">📞 {physio.contact}</p>
              <p className="text-sm">🕒 {physio.experience} years experience</p>
            </div>
          </div>
        ))}
      </div>

      {physios.length === 0 && !loading && location && (
        <p className="text-center text-gray-500 mt-8">
          No physiotherapists found in {location}
        </p>
      )}
    </div>
  );
}