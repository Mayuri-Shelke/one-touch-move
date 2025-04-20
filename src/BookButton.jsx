import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import {AuthModal} from './AuthModal';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

export default function BookButton({ physioId, physioName }) {
  const [user] = useAuthState(auth);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();

  const handleBookAppointment = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsBooking(true);
    try {
      // Create a new appointment document
      const appointmentRef = doc(collection(db, 'appointments'));
      await setDoc(appointmentRef, {
        physioId,
        physioName,
        userId: user.uid,
        userEmail: user.email,
        status: 'requested',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      navigate('/appointments'); // Redirect to appointments page
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      <button
        onClick={handleBookAppointment}
        disabled={isBooking}
        className={`w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors ${
          isBooking ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isBooking ? 'Booking...' : 'Book Appointment'}
      </button>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            handleBookAppointment();
          }}
          mode="login"
        />
      )}
    </>
  );
}