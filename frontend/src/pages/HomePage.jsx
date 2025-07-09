import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Rocket, ShieldCheck } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuthStore } from "../stores/auth.store";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function HomePage() {
  const { authUser, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkingAuth();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: false, 
    rootMargin: "-100px",
  });
  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      {/* HERO SECTION */}
      <section className="px-6 pt-32 pb-20 flex flex-col items-center text-center relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-indigo-400 to-pink-500 bg-clip-text text-transparent"
        >
          Empower Innovation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg max-w-2xl text-gray-300"
        >
          Connect. Collaborate. Create. Business Nexus is the future of startup
          & investor collaboration.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 mb-6"
        >
          {!authUser ? (
            <>
              <Link to="/register">
                <Button className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-lg shadow-xl">
                  Join Now
                </Button>
              </Link>
              <Link to="/login">
                <Button className="px-8 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 font-semibold text-lg">
                  Login
                </Button>
              </Link>
            </>
          ) : (
            <Link to="/dashboard">
              <Button className="px-8 py-3 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg shadow-xl">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </motion.div>
        {/* 3d */}
        <div
          ref={ref}
          className="relative w-full max-w-3xl mx-auto mt-12 rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="absolute top-0 w-full h-16 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none" />
          {inView && (
            <spline-viewer
              url="https://prod.spline.design/fJ2ptJKzT-sDkpfO/scene.splinecode"
              className="w-full h-[500px]"
            />
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-[#111827] rounded-t-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Core Features
          </h2>
          <p className="mt-4 text-gray-400">
            Designed to bring transparency, speed, and security to your funding
            journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ y: -8 }}
            className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-center shadow-lg hover:shadow-pink-500/30"
          >
            <Users className="h-10 w-10 text-pink-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">
              Dynamic Networking
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              Smart matchmaking tools to connect with the right people
              instantly.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-center shadow-lg hover:shadow-indigo-500/30"
          >
            <Rocket className="h-10 w-10 text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">
              Startup Showcase
            </h3>
            <p className="text-sm text-gray-300 mt-2">
              Upload your ideas, showcase your vision, and get discovered.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-center shadow-lg hover:shadow-indigo-400/30"
          >
            <ShieldCheck className="h-10 w-10 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white">Secure Access</h3>
            <p className="text-sm text-gray-300 mt-2">
              Fully protected real-time messaging and access control.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-24 py-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Business Nexus. Designed for the
        future.
      </footer>
    </div>
  );
}
