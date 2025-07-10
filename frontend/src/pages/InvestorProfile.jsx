import { Briefcase, User, Mail, Globe, ArrowRight, Pencil } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InvestorProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setProfile({
      user: {
        name: "Haroon Khan",
        email: "haroon@email.com",
      },
      bio: "I'm an investor passionate about supporting early-stage startups. I focus on technology-driven companies with high growth potential.",
      investmentInterests: ["AI", "Fintech", "Healthtech"],
    });
  }, []);

  if (!profile)
    return (
      <h1 className=" w-full h-screen bg-[#0f172a] text-white text-center pt-20">
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
          👔 Investor Profile
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            <ProfileField
              icon={<User className="text-indigo-400" />}
              label="Name"
              value={profile.user.name}
            />
            <ProfileField
              icon={<Mail className="text-indigo-400" />}
              label="Email"
              value={profile.user.email}
            />
            <ProfileField
              icon={<Briefcase className="text-indigo-400" />}
              label="Interested In"
              value={profile.investmentInterests.join(", ")}
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
              {profile.bio}
            </motion.p>
            <Link to={"/dashboard/investor"}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-[14px] md:text-[18px] inline-flex items-center justify-center bg-gradient-to-br from-indigo-500 to-pink-500 text-white px-5 py-2 rounded-xl font-medium hover:opacity-90 transition-all"
              >
                Connect with Entrepreneurs{" "}
                <ArrowRight size={18} className="ml-1 md:ml-2 md:size-[23px]" />
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-10 text-center">
          <Link
            to="/profile/investor/edit"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
          >
            <Pencil className="w-4 h-4 text-pink-400" />
            Edit Profile
          </Link>
        </div>
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
