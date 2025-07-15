import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useMessageStore } from "../stores/message.store";
import { useProfileStore } from "../stores/profile.store";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatPage() {
  const { id } = useParams();
  const { profile } = useProfileStore();
  const { messages, getMessages, sendMessage,loading } = useMessageStore();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    getMessages(id);
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(id, input);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl bg-white/5 mt-10 border border-white/20 rounded-3xl shadow-2xl flex flex-col h-[80vh]"
      >
        {/* Chat Header */}
        <div className="p-5 border-b border-white/10 text-center font-bold text-2xl bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
          Conversation Lounge
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
          {messages?.map((msg) => (
            <div
              key={msg._id}
              className={`max-w-[65%] px-5 py-3 rounded-2xl text-base shadow-md transition-all duration-300 ease-in-out whitespace-pre-line break-words ${
                msg.from === profile?._id
                  ? "bg-gradient-to-br from-indigo-600 to-purple-500 text-white ml-auto"
                  : "bg-white/10 text-white"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Field */}
        <div className="p-5 border-t border-white/10 bg-white/5 backdrop-blur-xl rounded-b-3xl">
          <div className="flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your magical thoughts..."
              className="flex-1 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-xl placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-gradient-to-br from-indigo-500 to-pink-500 hover:opacity-90 text-white rounded-xl transition"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}