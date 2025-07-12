import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import InvestorProfile from "./pages/InvestorProfile.jsx";
import InvestorDashboard from "./pages/InvestorDashboard.jsx";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard.jsx";
import EntrepreneurProfile from "./pages/EntrepreneurProfile.jsx";
import { useAuthStore } from "./stores/auth.store.js";
import { useEffect } from "react";
import ProfileEditForInvestor from "./components/ProfileEditForInvester.jsx";
import Logout from "./pages/Logout.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import EditEntrepreneurProfile from "./components/EditEntrepreneurProfile.jsx";

function App() {
  const { checkingAuth} = useAuthStore();

  useEffect(() => {
    checkingAuth();
  }, [checkingAuth]);

  return (
    <div className="min-h-screen bg-base-200 relative overflow-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/investor" element={<InvestorDashboard />} />
        <Route path="/profile/investor/:id" element={<InvestorProfile />} />
        <Route
          path="/profile/investor/edit"
          element={<ProfileEditForInvestor />}
        />
        <Route
          path="/dashboard/entrepreneur"
          element={<EntrepreneurDashboard />}
        />
        <Route
          path="/profile/entrepreneur/:id"
          element={<EntrepreneurProfile />}
        />
        <Route
          path="/profile/entrepreneur/edit"
          element={<EditEntrepreneurProfile />}
        />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}

export default App;
