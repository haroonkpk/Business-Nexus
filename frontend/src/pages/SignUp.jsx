import { Eye, EyeOff, LoaderPinwheel } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth.store.js";

export default function SignUp() {
  const { UserSignUp, authUser, isSignuping } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "investor",
  });

  function handleSubmit(e) {
    e.preventDefault();
    UserSignUp(formData);
  }

  if (authUser) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-[#0f172a] text-white px-6 pt-24">
      {/* Left Form Side */}
      <div className="w-full max-w-xl flex flex-col justify-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-500 text-center"
        >
          Join Our Network
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-gray-400 text-base md:text-lg"
        >
          Connect with people who share your vision. Create your account to get
          started.
        </motion.p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            required
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 pr-10 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <select
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="investor">Investor</option>
            <option value="entrepreneur">Entrepreneur</option>
          </select>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl font-semibold text-white hover:opacity-90 transition-all"
          >
            {isSignuping ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderPinwheel className="size-5 animate-spin" /> Signing up...
              </div>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-400 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Right Side Illustration */}
      <motion.img
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        src="/assets/Live collaboration-rafiki.svg"
        alt="Hero Illustration"
        className="hidden lg:block w-full max-w-xl mt-12 drop-shadow-2xl"
      />
    </div>
  );
}
