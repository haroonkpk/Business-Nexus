import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import toast, { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/auth.store.js";
import { useEffect, useState } from "react";
import { LoaderPinwheel } from "lucide-react";
import Navbar from "./components/Navbar.jsx";
import { useThemeStore } from "./stores/theme.store.js";
import Footer from "./components/Footer.jsx";
import { useLocation } from "react-router-dom";
import Admin from "./pages/Admin.jsx";
import StoryLoader from "./components/StoryLoader.jsx";
import { useStore } from "zustand";
import { useStoryStore } from "./stores/story.store.js";

function App() {
  // const location = useLocation();

  // const { authUser, checkingAuth, isCheckingAuth } = useAuthStore();
  // const { theme } = useThemeStore();
  // const { loading } = useStoryStore();

  // useEffect(() => {
  //   document.querySelector("html").setAttribute("data-theme", theme);
  // }, [theme]);

  // useEffect(() => {
  //   checkingAuth();
  // }, [checkingAuth]);

  // if (isCheckingAuth) return <StoryLoader />;
  return (
    <div className="min-h-screen bg-base-200 relative overflow-auto">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/login"
          element={<Login /> }
        />
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
