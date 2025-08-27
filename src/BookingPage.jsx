import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { query, where, getDocs } from 'firebase/firestore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { getAuth } from 'firebase/auth';
import GoHomeButton from './GoHomeButton';

export default function BookAppointment() {
  const auth = getAuth();
const currentUser = auth.currentUser;

if (!currentUser) {
  alert('User not logged in.');
  return;
}   // Prevent rendering until auth state is resolved


  const { state } = useLocation();
  const doctor = state?.doctor;
  const availableDays = Object.keys(doctor.availability || {});
  const [appointmentData, setAppointmentData] = useState({
    patientName: '',
    email: '',
    date: '',
    time: ''
  });
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  const handleChange = (e) => {
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { patientName, email } = appointmentData;
  
    if (!selectedDay || !selectedTime || !patientName || !email) {
      alert('Please fill in all fields');
      return;
    }
  
    try {
      const appointmentsRef = collection(db, 'appointments');
      
      // 🔍 Query for existing appointment with same doctor, day, and time
      const q = query(
        appointmentsRef,
        where('doctorId', '==', doctor?.id),
        where('date', '==', format(appointmentData.date, 'MMMM d, yyyy')),

        where('time', '==', selectedTime)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        alert(`This time slot on ${selectedDay} at ${selectedTime} is already booked. Please choose another.`);
        return;
      }
  
      // ✅ No conflicts, proceed to book
      await addDoc(appointmentsRef, {
        ...appointmentData,
        doctorId: doctor?.id,
        doctorName: doctor?.name,
        userId: currentUser.uid,         // 👈 Store UID here
        email: currentUser.email,  
        day: selectedDay,
        date: format(appointmentData.date, 'MMMM d, yyyy'),
        time: selectedTime,
        createdAt: new Date()
      });
      
  
      alert('Appointment booked successfully!');
      setAppointmentData({
        patientName: '',
        email: '',
        date: '',
        time: ''
      });
  
      setSelectedDay('');
      setSelectedTime('');
  
    } catch (error) {
      alert('Error booking appointment: ' + error.message);
    }
  };
  
  

  if (!doctor) {
    return <div className="text-center mt-32 text-red-600 font-semibold">No doctor selected.</div>;
  }

  return (
    
    <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
           
      {/* Doctor Info */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <img src={doctor.profilePic} alt={doctor.name} className="w-full max-h-[350px] object-contain 
        rounded-xl border shadow-md bg-gray-50 transition-transform duration-300 hover:scale-105"/>
        <h2 className="text-2xl font-bold mt-4">{doctor.name}</h2>
        <p className="text-gray-600 mt-1">{doctor.specialization}</p>
        <p className="text-gray-600 mt-1">Experience: {doctor.experience} years</p>
        <p className="text-gray-600 mt-1">Location: {doctor.location}</p>
        <p className="text-gray-600 mt-1">Contact: {doctor.contact}</p>
        <p className="text-gray-600 mt-1">Services: {doctor.services?.join(', ')}</p>
      </div>

      {/* Booking Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
  <input
    type="text"
    name="patientName"
    value={appointmentData.patientName}
    onChange={handleChange}
    placeholder="Your Full Name"
    className="w-full p-2 border border-gray-300 rounded"
  />

  <input
    type="email"
    name="email"
    value={appointmentData.email}
    onChange={handleChange}
    placeholder="Your Email"
    className="w-full p-2 border border-gray-300 rounded"
  />

  {/* Date Picker */}
<div>
  <label className="block mb-2 font-medium">Select Date</label>
  <DatePicker
    selected={appointmentData.date}
    onChange={(date) => {
      const dayName = format(date, 'EEEE'); // 'Monday', 'Tuesday' etc.
      setSelectedDay(dayName);
      setAppointmentData({ ...appointmentData, date }); // Save actual date
      setSelectedTime('');
    }}
    filterDate={(date) => {
      const dayName = format(date, 'EEEE');
      return availableDays.includes(dayName); // enable only available days
    }}
    minDate={new Date()} // no past dates
    placeholderText="Choose an available date"
    className="w-full p-2 border border-gray-300 rounded"
    dateFormat="MMMM d, yyyy"
  />
</div>


  {/* Time Slot Selector */}
{selectedDay && (
  <div>
    <label className="block mt-4 mb-2 font-medium">Select Time Slot</label>
    <div className="flex flex-wrap gap-2">
      {doctor.availability[selectedDay]?.map((time) => {
        // Convert "14:00" → "2:00 PM"
        const [hour, minute] = time.split(':');
        const formattedTime = new Date(0, 0, 0, hour, minute).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });

        return (
          <button
            key={time}
            type="button"
            onClick={() => setSelectedTime(time)}
            className={`px-4 py-2 rounded border ${
              selectedTime === time ? 'bg-green-600 text-white' : 'bg-gray-100'
            }`}
          >
            {formattedTime}
          </button>
        );
      })}
    </div>
  </div>
)}


  {/* Hidden inputs to pass selected values */}
  <input type="hidden" name="date" value={selectedDay} />
  <input type="hidden" name="time" value={selectedTime} />

  <button
    type="submit"
    className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    disabled={!selectedDay || !selectedTime}
  >
    Confirm Appointment
  </button>
</form>

      </div>
    </div>
  );
}
