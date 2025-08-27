import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


const ManagePhysiotherapists = () => {
  const [physios, setPhysios] = useState([]);

  useEffect(() => {
    const fetchPhysios = async () => {
      const snapshot = await getDocs(collection(db, "physiotherapists"));
      setPhysios(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPhysios();
  }, []);

  const deletePhysio = async (id) => {
    await deleteDoc(doc(db, "physiotherapists", id));
    setPhysios(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="flex">
     
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">Manage Physiotherapists</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Specialization</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {physios.map(p => (
              <tr key={p.id}>
                <td className="border p-2">{p.name}</td>
                <td className="border p-2">{p.specialization}</td>
                <td className="border p-2">{p.location}</td>
                <td className="border p-2">
                  <button onClick={() => deletePhysio(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
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

export default ManagePhysiotherapists;
