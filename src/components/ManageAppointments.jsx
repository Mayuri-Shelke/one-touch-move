import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const snapshot = await getDocs(collection(db, "appointments"));
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "appointments", id), { status });
    setAppointments(prev => prev.map(appt => appt.id === id ? { ...appt, status } : appt));
  };

  return (
    <div className="flex">
      
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Appointments</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Patient</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt.id}>
                <td className="border p-2">{appt.patientName}</td>
                <td className="border p-2">{appt.doctorName}</td>
                <td className="border p-2">{appt.date}</td>
                <td className="border p-2">{appt.time}</td>
                <td className="border p-2">{appt.status || 'Pending'}</td>
                <td className="border p-2">
                  <button onClick={() => updateStatus(appt.id, "completed")} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                    Complete
                  </button>
                  <button onClick={() => updateStatus(appt.id, "cancelled")} className="bg-red-500 text-white px-3 py-1 rounded">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointments;
