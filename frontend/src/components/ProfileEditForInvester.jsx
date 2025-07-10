import { useState } from "react";
import { motion } from "framer-motion";
import { LoaderPinwheel } from "lucide-react";

export default function ProfileEditForInvestor() {
  const [formData, setFormData] = useState({
    bio: "I'm an investor passionate about startups and emerging tech.",
    investmentInterests: "AI, Fintech, Healthtech",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert("Profile updated! (Dummy)");
      setSubmitting(false);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 pt-24">
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur border border-white/20 rounded-xl shadow-xl p-6 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-500 text-center"
        >
          Edit Investor Profile
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={4}
            required
            name="bio"
            placeholder="Your bio..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            required
            name="investmentInterests"
            placeholder="Investment interests (comma separated)"
            value={formData.investmentInterests}
            onChange={(e) =>
              setFormData({ ...formData, investmentInterests: e.target.value })
            }
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-xl font-semibold text-white hover:opacity-90 transition"
          >
            {submitting ? (
              <div className="flex items-center justify-center gap-2">
                <LoaderPinwheel className="size-5 animate-spin" /> Updating...
              </div>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
