import {
  Briefcase,
  User,
  Mail,
  Globe,
  ArrowRight,
  Pencil,
  Rocket,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useProfileStore } from "../stores/profile.store";
import { useAuthStore } from "../stores/auth.store";

export default function EntrepreneurProfile() {
  const { id } = useParams();
  const { getProfile, profile,loading } = useProfileStore();
  const{authUser}=useAuthStore()

  useEffect(() => {
    getProfile(id);
  }, [id]);

  if (!profile || loading)
    return (
      <h1 className="w-full h-screen bg-[#0f172a] text-white text-center pt-20">
        Loading...
      </h1>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-6 py-21 md:py-16 text-white">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur border border-white/20 shadow-xl rounded-2xl p-8 md:p-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-500 mb-6 md:text-center"
        >
          Entrepreneur Profile
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            <ProfileField
              icon={<User className="text-indigo-400" />}
              label="Founder"
              value={profile.user.username}
            />
            <ProfileField
              icon={<Mail className="text-indigo-400" />}
              label="Email"
              value={profile.user.email}
            />
            <ProfileField
              icon={<Briefcase className="text-indigo-400" />}
              label="startupName"
              value={profile.startupName || "N/A"}
            />
            <ProfileField
              icon={<Globe className="text-indigo-400" />}
              label="pitchDeckUrl"
              value={profile.pitchDeckUrl || "N/A"}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <ProfileField
              icon={<Rocket className="text-indigo-400" />}
              label="Looking For"
              value={profile.fundingNeed || "Funding, Mentorship"}
            />
            <ProfileField
              icon={<Lightbulb className="text-indigo-400" />}
              label="startupDescription Summary"
              value={profile.startupDescription || "No summary added yet."}
            />

            {authUser.role === "entrepreneur" && (
            <Link to="/dashboard/entrepreneur">
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-medium shadow-[0_0_10px_#00000033] hover:bg-white/20 hover:shadow-[0_0_18px_#ffffff33] transition-all duration-300"
              >
                Connect with Investors
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
        {authUser.role === "entrepreneur" && (

        <div className="mt-10 text-center">
          <Link
            to="/profile/entrepreneur/edit"
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
        <p className="font-semibold text-white break-words whitespace-pre-wrap">
          {value}
        </p>
      </div>
    </div>
  );
}
