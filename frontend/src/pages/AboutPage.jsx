import { motion } from "framer-motion";
import { Users, Target, Globe2 } from "lucide-react";
import { useAuthStore } from "../stores/auth.store";

export default function About() {
  const {authUser}=useAuthStore()
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 pt-28 pb-20 font-sans">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent mb-6"
      >
        About Business Nexus
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl mx-auto text-center text-gray-300 text-lg"
      >
        Business Nexus bridges the gap between visionaries and investors —
        empowering innovation, one connection at a time.
      </motion.p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
        <InfoCard
          icon={<Target className="w-8 h-8 text-pink-400" />}
          title="Our Mission"
          desc="To create a smart ecosystem where entrepreneurs find real support and investors discover the next big idea — fast, secure and seamless."
          shadowClass="hover:shadow-pink-400/30"
        />
        <InfoCard
          icon={<Users className="w-8 h-8 text-indigo-400" />}
          title="Our Community"
          desc="We are building a global community of builders, dreamers, and doers — united by ambition and powered by collaboration."
          shadowClass="hover:shadow-indigo-400/30"
        />
        <InfoCard
          icon={<Globe2 className="w-8 h-8 text-green-400" />}
          title="Global Vision"
          desc="With a focus on emerging markets, we help startups unlock capital and mentorship from anywhere in the world."
          shadowClass="hover:shadow-green-400/30"
        />
      </div>

      {/* Call to Action */}
      {!authUser &&(
      <div className="text-center mt-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg text-gray-400"
        >
          Join us in redefining the future of entrepreneurship.
        </motion.p>
        <motion.a
          href="/register"
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-6 px-8 py-3 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 text-white font-semibold hover:opacity-90 transition"
        >
          Get Started
        </motion.a>
      </div>
      )}
    </div>
  );
}

function InfoCard({ icon, title, desc, shadowClass }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`p-6 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-center shadow-lg transition ${shadowClass}`}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-300">{desc}</p>
    </motion.div>
  );
}
