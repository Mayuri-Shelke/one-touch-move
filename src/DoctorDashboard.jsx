import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const q = query(
      collection(db, "appointments"),
      where("doctorId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Appointments Schedule</h2>
      {appointments.length === 0 ? (
        <p>No appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt.id} className="border rounded-lg p-4 shadow">
              <p><strong>Patient:</strong> {appt.patientName}</p>
              <p><strong>Date:</strong> {appt.date}</p>
              <p><strong>Time:</strong> {appt.time}</p>
              <p><strong>Email:</strong> {appt.email}</p>
              <p><strong>Status:</strong> {appt.status || 'Confirmed'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
