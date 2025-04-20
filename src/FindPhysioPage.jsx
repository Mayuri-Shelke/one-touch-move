import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ServiceSelector from './ServiceSelector';
import PhysioSearchPage from './PhysioSearchPage';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function FindPhysioPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceType = searchParams.get('type');
  const location = searchParams.get('location');

  // Clear location param if service type changes
  useEffect(() => {
    if (serviceType && location) {
      searchParams.delete('location');
      navigate(`/find-physio?${searchParams.toString()}`, { replace: true });
    }
  }, [serviceType, location, navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      {!serviceType ? (
        <div className="py-12 px-4 max-w-7xl mx-auto">
          <ServiceSelector />
        </div>
      ) : (
        <div className="py-8 px-4 max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/find-physio')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Services
          </button>
          <PhysioSearchPage />
        </div>
      )}
    </div>
  );
}