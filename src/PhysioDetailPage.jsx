import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useParams, useNavigate } from 'react-router-dom';
import BookButton from './BookButton';

export default function PhysioDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [physio, setPhysio] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhysio = async () => {
      try {
        const docRef = doc(db, 'physiotherapists', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPhysio({
            id: docSnap.id,
            name: data.name,
            specialization: data.specialization,
            location: data.location,
            experience: data.experience,
            contact: data.contact,
            createdAt: data.createdAt?.toDate()?.toLocaleDateString() || 'Unknown'
          });
        } else {
          navigate('/'); // Redirect if physio not found
        }
      } catch (error) {
        console.error("Error fetching physio:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhysio();
  }, [id, navigate]);

  if (loading) return <div className="text-center py-12">Loading physiotherapist details...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      >
        ← Back to results
      </button>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold capitalize">{physio.name}</h1>
          <p className="text-blue-600 font-medium mt-2 capitalize">{physio.specialization}</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span className="capitalize">{physio.location}</span>
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📞</span>
                  {physio.contact}
                </p>
                <p className="flex items-center">
                  <span className="mr-2">🕒</span>
                  {physio.experience} years of experience
                </p>
                <p className="flex items-center">
                  <span className="mr-2">📅</span>
                  Member since {physio.createdAt}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Book Appointment</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <BookButton physioId={physio.id} physioName={physio.name} />
                <p className="text-sm text-gray-500 mt-2">
                  You'll be able to choose date/time after clicking
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}