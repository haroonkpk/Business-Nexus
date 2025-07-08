import { motion } from "framer-motion";

export default function Card({ arr, index }) {
  return (
    <motion.div
      className="w-full max-w-full bg-base-200 rounded-2xl relative shadow-md p-4 sm:max-w-md"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.img
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        src={arr.img}
        alt={arr.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      {index >= 0 && (
        <div className="absolute top-2 left-2 bg-purple-600 text-white rounded-full px-2 py-1 text-xs font-semibold">
          Ep {index + 1}
        </div>
      )}
      <motion.h2
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-xl font-bold mb-2"
      >
        {arr.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-600"
      >
        {arr.description?.split(" ").slice(0, 6).join(" ")}...
      </motion.p>
    </motion.div>
  );
}
