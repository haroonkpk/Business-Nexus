import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function InvestorDashboard() {
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  useEffect(() => {
    // Fetch entrepreneurs from API
    // setEntrepreneurs(data);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Investor Dashboard
      </motion.h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entrepreneurs.map((e) => (
          <div key={e._id} className="p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold">{e.name}</h2>
            <p className="text-gray-600">{e.startup}</p>
            <p className="text-sm mt-2">{e.pitchSummary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
