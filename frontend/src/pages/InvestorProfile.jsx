import { Briefcase, User, Mail, Globe, ArrowRight, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useProfileStore } from "../stores/profile.store";
import { useAuthStore } from "../stores/auth.store";
import Loader from "../components/ui/Loader";

export default function InvestorProfile() {
  const { id } = useParams();
  const { getProfile, profile, loading } = useProfileStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getProfile(id);
  }, [id]);

  if (!profile || loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 py-21 md:py-16 text-white">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur border border-white/20 shadow-xl rounded-2xl p-8 md:p-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-500 mb-6 md:text-center"
        >
          👔 Investor Profile
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            <ProfileField
              icon={<User className="text-indigo-400" />}
              label="Name"
              value={profile.user?.username}
            />
            <ProfileField
              icon={<Mail className="text-indigo-400" />}
              label="Email"
              value={profile.user?.email}
            />
            <ProfileField
              icon={<Briefcase className="text-indigo-400" />}
              label="Interested In"
              value={profile.investmentInterests?.join(", ") || "N/A"}
            />
            <ProfileField
              icon={<Globe className="text-indigo-400" />}
              label="Location"
              value="Pakistan"
            />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-base leading-relaxed"
            >
              {profile.bio || "N/A"}
            </motion.p>

            {authUser.role === "investor" && (
              <Link to={"/dashboard/investor"}>
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                  className="w-full relative inline-flex items-center justify-center mt-1 gap-2 px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium shadow-[0_0_10px_#00000033] hover:bg-white/20 hover:shadow-[0_0_18px_#ffffff33] transition-all duration-300"
                >
                  Connect with Entrepreneurs
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>
            )}
          </div>
        </div>

        {/* Edit Button */}
        {authUser.role === "investor" && (
          <div className="mt-10 text-center">
            <Link
              to="/profile/investor/edit"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
            >
              <Pencil className="w-4 h-4 text-pink-400" />
              Edit Profile
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileField({ icon, label, value }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
