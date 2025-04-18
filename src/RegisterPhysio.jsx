
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


export default function RegisterPhysio() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    location: "",
    experience: "",
    contact: "",
    profileImage: null,
  });
    
  useEffect(() => {
    const checkAccess = async () => {
      const user = auth.currentUser;
      if (!user) {
        alert("Please log in first.");
        navigate("/login");
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.data();

      if (userData?.role === "admin") {
        setIsAdmin(true);
      } else {
        alert("Access denied. Only for admin.");
        navigate("/");
      }
    };

    checkAccess();
  }, [navigate]);

  if (!isAdmin) return null;



  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 👉 Here you’ll send data to Firebase or your backend
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800">Register as a Physiotherapist</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-8 bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto"
      >
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
            required
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization (e.g., Sports, Manual Therapy)"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="City or Area"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
            required
          />
          <input
            type="number"
            name="experience"
            placeholder="Years of Experience"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
            required
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
            required
          />
          <input
            type="file"
            name="profileImage"
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg"
            accept="image/*"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
