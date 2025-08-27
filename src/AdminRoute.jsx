import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

const AdminRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        console.log("User is logged in:", user.uid);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const role = docSnap.data().role;
          console.log("Role from Firestore:", role);
          setIsAdmin(role === "admin");
        } else {
          console.log("User document does not exist in Firestore");
          setIsAdmin(false);
        }
      } else {
        console.log("No user logged in");
      }
      setChecking(false);
    };

    checkAdmin();
  }, [user]);

  // Show loading message while checking
  if (loading || checking) return <div>Loading...</div>;

  // Redirect if not admin
  if (!user || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  

  // Render protected content
  return children;
};

export default AdminRoute;
