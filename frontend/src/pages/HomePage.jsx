// ✅ Ultra-modern HomePage (2025 style)
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Rocket, Users, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#fdfbfb] to-[#ebedee]">
      {/* HERO SECTION */}

      <section className="flex flex-col items-center justify-center px-6 pt-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 tracking-tight"
        >
          Build <span className="text-indigo-600">Connections</span>,<br />
          Fund <span className="text-indigo-600">Dreams</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-2xl mt-6 text-lg text-gray-600"
        >
          A bold platform where ideas meet capital. Elevate your journey with
          smart collaboration and real-time communication.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link to="/register">
            <Button variant="primary">Join the Network</Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          {/* <Button variant="primary">Go to Dashboard</Button> */}
        </motion.div>

        <motion.img
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          src="/assets/network-illustration.svg"
          alt="Hero Illustration"
          className="w-full max-w-xl mt-12"
        />
      </section>

      {/* FEATURES */}
      <section className="mt-20 px-6 py-16 bg-white rounded-t-3xl shadow-inner">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900">
            Built for Modern Collaboration
          </h2>
          <p className="text-gray-500 mt-3">
            Core features designed to connect vision with investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-lg text-center"
          >
            <Users className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Dynamic Networking</h3>
            <p className="text-sm text-gray-500 mt-2">
              Smart matchmaking tools to find relevant partners instantly.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-lg text-center"
          >
            <Rocket className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Startup Showcase</h3>
            <p className="text-sm text-gray-500 mt-2">
              Share your pitch deck and get noticed by real investors.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-2xl shadow-lg text-center"
          >
            <ShieldCheck className="h-10 w-10 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Secure Access</h3>
            <p className="text-sm text-gray-500 mt-2">
              Role-based protection and real-time encrypted messaging.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-24 py-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Business Nexus. Designed for the
        future.
      </footer>
    </div>
  );
}
