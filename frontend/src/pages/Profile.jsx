import { Briefcase, User, Mail, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function InvestorProfile() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8 md:p-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
        >
          👔 Investor Profile
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Basic Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-800">Haroon Khan</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Mail className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">haroon@email.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Briefcase className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Interested In</p>
                <p className="font-medium text-gray-800">Tech Startups</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Globe className="text-indigo-600" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium text-gray-800">Pakistan</p>
              </div>
            </div>
          </div>

          {/* Right Column: About / Actions */}
          <div className="space-y-4">
            <p className="text-gray-600 text-base leading-relaxed">
              I'm an investor passionate about supporting early-stage startups
              and helping founders bring innovative ideas to life. I focus
              mostly on technology-driven companies with high growth potential.
            </p>

            <button className="inline-flex items-center bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition">
              Connect with Entrepreneurs <ArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
