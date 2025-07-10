import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar.jsx";
import InvestorProfile from "./pages/Profile.jsx";
import InvestorDashboard from "./pages/InvestorDashboard.jsx";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard.jsx";
import EntrepreneurProfile from "./pages/EntrepreneurProfile.jsx";
import { useAuthStore } from "./stores/auth.store.js";
import { useEffect } from "react";
import ProfileEditForInvestor from "./components/ProfileEditForInvester.jsx";

function App() {
  // const location = useLocation();

  const { authUser, checkingAuth, isCheckingAuth } = useAuthStore();
  // const { theme } = useThemeStore();
  // const { loading } = useStoryStore();

  // useEffect(() => {
  //   document.querySelector("html").setAttribute("data-theme", theme);
  // }, [theme]);

  useEffect(() => {
    checkingAuth();
  }, [checkingAuth]);

  // if (isCheckingAuth) return <StoryLoader />;
  return (
    <div className="min-h-screen bg-base-200 relative overflow-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/investor" element={<InvestorDashboard />} />
        <Route path="/profile/investor/:id" element={<InvestorProfile />} />
        <Route path="/profile/investor/edit" element={<ProfileEditForInvestor />} />
        <Route
          path="/dashboard/entrepreneur"
          element={<EntrepreneurDashboard />}
        />
        <Route
          path="/profile/entrepreneur/:id"
          element={<EntrepreneurProfile />}
        />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* <Route path="/stories/:typeId" element={<StoriesPage />} />
        <Route path="/episodes/:storyId" element={<EpisodePage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/admin-dashboard"
          element={authUser?.role === "admin" ? <Admin /> : <Navigate to="/" />}
        /> */}
        {/* <Route path="/episode/:episodeId" element={<EpisodeDetail />} /> */}
      </Routes>
      <Toaster position="top-center" reverseOrder={true} />
      {/* {!(
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/admin-dashboard"
      ) && <Footer />} */}
    </div>
  );
}

export default App;
