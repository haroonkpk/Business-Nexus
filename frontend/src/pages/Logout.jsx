import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut as LogOutIcon } from "lucide-react";
import { useAuthStore } from "../stores/auth.store";

export default function Logout() {
  const navigate = useNavigate();
  const { LogOut } = useAuthStore();

  function handleConfirm() {
    LogOut();
    navigate("/login");
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 py-20 text-white">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white/10 backdrop-blur border border-white/20 p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-6"
      >
        <LogOutIcon className="mx-auto text-pink-400 w-10 h-10" />
        <h2 className="text-xl font-semibold text-white">Confirm Logout</h2>
        <p className="text-gray-300 text-sm">
          Are you sure you want to log out from your account?
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg text-sm border border-white/20 hover:bg-white/10 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-gradient-to-br from-pink-500 to-indigo-500 text-sm rounded-lg font-medium hover:opacity-90 transition"
          >
            Yes, Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}
