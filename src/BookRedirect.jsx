import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function BookRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/services"); // ✅ redirect to services if logged in
      } else {
        navigate("/login"); // 🔐 redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return null; // No UI needed
}
