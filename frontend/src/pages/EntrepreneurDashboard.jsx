import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useRequestStore } from "../stores/request.store";

export default function EntrepreneurDashboard() {
  const { ReceivedRequests, getReceivedReq, updateStatus } = useRequestStore();

  useEffect(() => {
    getReceivedReq();
  }, []);

  const handleAction = async (id, newStatus) => {
    await updateStatus(id, newStatus);
    await getReceivedReq();
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-pink-500"
        >
          Collaboration Requests
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ReceivedRequests.map((req) => (
            <motion.div
              key={req._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">
                    {req.from?.user?.username}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {req.from?.bio?.slice(0, 60)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <Link
                  to={`/profile/investor/${req.from?.user?._id}`}
                  className="text-sm text-indigo-400 hover:underline"
                >
                  View Profile
                </Link>

                {req.status === "Accepted" && (
                  <Link
                    to={`/chat/${req.from?._id}`}
                    className="text-sm text-pink-400 hover:underline"
                  >
                    Message
                  </Link>
                )}

                {req.status === "Pending" && (
                  <>
                    <button
                      onClick={() => handleAction(req._id, "Accepted")}
                      className="px-3 py-1 bg-green-600 rounded-full text-xs font-medium hover:bg-green-700 transition"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(req._id, "Rejected")}
                      className="px-3 py-1 bg-red-500 rounded-full text-xs font-medium hover:bg-red-600 transition"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
