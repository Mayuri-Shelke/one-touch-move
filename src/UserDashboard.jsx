// src/UserDashboard.jsx
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import GoHomeButton from "./GoHomeButton";
export default function UserDashboard() {
  const [appointments, setAppointments] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const q = query(
      collection(db, "appointments"),
      where("userId", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6">
      <GoHomeButton />
      <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="border rounded-lg p-4 shadow">
              <p><strong>Doctor:</strong> {appt.doctorName}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Status:</strong> {appt.status || 'Confirmed'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


