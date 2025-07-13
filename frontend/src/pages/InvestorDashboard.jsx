import { motion } from "framer-motion";
import { ArrowRight, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProfileStore } from "../stores/profile.store";
import { useRequestStore } from "../stores/request.store";

export default function InvestorDashboard() {
  const { getentrepreneurProfiles, entrepreneurProfiles, loading:profileLoading } =
    useProfileStore();
  const { createRequest, getSnetRequests, requests, loading:reqLoading } =
    useRequestStore();

  useEffect(() => {
    getentrepreneurProfiles();
    getSnetRequests();
  }, []);

  const getStatus = (entrepreneurProfileId) => {
    const found = requests.find((req) => req.to._id === entrepreneurProfileId);
    return found ? found.status : null;
  };


  if (reqLoading || profileLoading)
    return (
      <h1 className=" w-full h-screen bg-[#0f172a] text-white text-center pt-20">
        Loading...
      </h1>
    );
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
        {entrepreneurProfiles.map((e, i) => {
          const status = getStatus(e._id);
          return (
            <motion.div
              key={e._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 shadow-md flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">
                  {e.user?.username}
                </h2>
                <p className="text-pink-400 font-semibold">{e.startupName}</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {e.startupDescription}
                </p>
              </div>

              <div className="mt-4">
                {status === "Accepted" ? (
                  <Link
                    to={`/chat/${e.id}`}
                    className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 hover:opacity-90 transition"
                  >
                    Message <MessageSquareText size={16} />
                  </Link>
                ) : status === "Pending" ? (
                  <span className="inline-block px-4 py-2 text-sm rounded-xl bg-yellow-500 text-white font-medium">
                    Pending
                  </span>
                ) : status === "Rejected" ? (
                  <span className="inline-block px-4 py-2 text-sm rounded-xl bg-red-500 text-white font-medium">
                    Rejected
                  </span>
                ) : (
                  <button
                    onClick={async () => {
                      try {
                        await createRequest(e._id);
                        await getSnetRequests();
                      } catch (err) {
                        console.error("Request failed:", err);
                        toast.error("Request failed. Try again.");
                      }
                    }}
                    className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 hover:opacity-90 transition "
                  >
                    Send Request <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
