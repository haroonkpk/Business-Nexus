import { Eye, EyeOff, LoaderPinwheel } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import {motion} from "framer-motion"
import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/auth.store.js";

export default function SignUp() {
  const { UserSignUp, authUser, isSignuping } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    UserSignUp(formData);
  }
  if (authUser) {
    return <Navigate to="/" />;
  }
  console.log("Auth User:", authUser);
  return (
    <div className="w-full h-screen flex items-center justify-center px-6 pt-26">
      {/* signup LEFT SIDE like homepage */}
      <div className="w-full max-w-xl lg:w-1/2 flex flex-col justify-center items-center space-y-8 px-4 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 text-center"
        >
          Join <span className="text-indigo-600">Our Network</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center text-gray-600 text-base md:text-lg"
        >
          Connect with people who share your vision. Create your account to get
          started.
        </motion.p>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">
          {/* Username */}
          <label className="input w-full">
            {/* SVG remains same */}
            <input
              type="text"
              required
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </label>

          {/* Email */}
          <label className="input w-full">
            <input
              type="email"
              placeholder="haroon@gmail.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>

          {/* Password */}
          <label className="input w-full">
            <input
              type={showPassword ? "text" : "password"}
              required
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 ml-2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </label>

          {/* Button */}
          <button
            type="submit"
            className="btn bg-indigo-600 text-white hover:bg-indigo-700 transition w-full"
          >
            {isSignuping ? (
              <>
                <LoaderPinwheel className="size-5 animate-spin mr-2" />
                Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </button>
        </form>

        <div className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </div>
      </div>

      {/* right Side */}
      <motion.img
        src="/assets/Live collaboration-rafiki.svg"
        alt="Hero Illustration"
        className="hidden lg:block w-full max-w-xl mt-12"
      />
    </div>
  );
}
