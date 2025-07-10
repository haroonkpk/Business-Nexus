import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function InvestorDashboard() {
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  useEffect(() => {
    // ✅ Dummy entrepreneur list
    setTimeout(() => {
      setEntrepreneurs([
        {
          id: "1",
          name: "Areeba Shah",
          startup: "EcoLoop",
          pitch:
            "A platform for sustainable packaging solutions for small businesses.",
        },
        {
          id: "2",
          name: "Zaid Khan",
          startup: "HealthSnap",
          pitch: "Instant health diagnostics using smartphone camera AI.",
        },
        {
          id: "3",
          name: "Mehreen Javed",
          startup: "Learnify",
          pitch: "An AI-powered learning app tailored for Pakistani students.",
        },
      ]);
    }, 300);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 pt-24 pb-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-500 text-center mb-10"
      >
        Entrepreneur Explorer
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrepreneurs.map((e, i) => (
          <motion.div
            key={e.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 shadow-md flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">{e.name}</h2>
              <p className="text-pink-400 font-semibold">{e.startup}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{e.pitch}</p>
            </div>
            {false ? (
              <Link to={`/chat/${e.id}`} className="mt-4 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 hover:opacity-90 transition">
                Message
              </Link>
            ) : (
              <button className="mt-4 inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 hover:opacity-90 transition">
                Send Request <ArrowRight size={16} />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
