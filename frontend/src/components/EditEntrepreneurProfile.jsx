import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProfileStore } from "../stores/profile.store";
import { motion } from "framer-motion";
import { useAuthStore } from "../stores/auth.store";
import Loader from "./ui/Loader";

export default function EditEntrepreneurProfile() {
  const { id } = useParams();
  const { authUser } = useAuthStore();
  const { getProfile, updateProfile, profile, loading } = useProfileStore();

  const [formData, setFormData] = useState({
    startupName: "",
    pitchDeckUrl: "",
    fundingNeed: "",
    startupDescription: "",
  });

  useEffect(() => {
    if (profile._id !== id && id !== undefined) {
      getProfile(id);
    }
  }, [id]);

  useEffect(() => {
    if (profile) {
      setFormData({
        startupName: profile.startupName || "",
        pitchDeckUrl: profile.pitchDeckUrl || "",
        fundingNeed: profile.fundingNeed || "",
        startupDescription: profile.startupDescription || "",
      });
    }
  }, [profile]);

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile(formData);
  }

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 py-20 text-white">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur border border-white/20 shadow-xl rounded-2xl p-8 md:p-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-500 mb-8 text-center"
        >
          Edit Entrepreneur Profile
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Startup Name"
            value={formData.startupName}
            onChange={(e) =>
              setFormData({ ...formData, startupName: e.target.value })
            }
          />

          <Input
            label="pitchDeckUrl"
            value={formData.pitchDeckUrl}
            onChange={(e) =>
              setFormData({ ...formData, pitchDeckUrl: e.target.value })
            }
          />

          <Input
            label="Looking For (fundingNeed)"
            value={formData.fundingNeed}
            onChange={(e) =>
              setFormData({ ...formData, fundingNeed: e.target.value })
            }
          />

          <Textarea
            label="startupDescription Summary"
            value={formData.startupDescription}
            onChange={(e) =>
              setFormData({ ...formData, startupDescription: e.target.value })
            }
          />

          <motion.button
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 px-6 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 font-semibold text-white hover:opacity-90 transition"
          >
            Save Changes
          </motion.button>
        </form>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-300">{label}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </label>
  );
}

function Textarea({ label, value, onChange }) {
  return (
    <label className="block">
      <span className="text-sm text-gray-300">{label}</span>
      <textarea
        rows="4"
        value={value}
        onChange={onChange}
        className="w-full mt-1 px-4 py-2 rounded-lg bg-white/5 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
      />
    </label>
  );
}
