import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMessageStore } from "../stores/message.store";
import { useProfileStore } from "../stores/profile.store";

export default function ChatPage() {
  const { id } = useParams();
  const { profile } = useProfileStore();

  const [input, setInput] = useState("");

  const { messages, getMessages, sendMessage } = useMessageStore();

  useEffect(() => {
    getMessages(id);
  }, [id]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(id, input);
    setInput("");
  };

  return (
    <div className="p-6">
      <div className="bg-white/10 p-4 rounded-xl h-[400px] overflow-y-scroll">
        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 my-1 rounded ${
              msg.from === profile?._id ? "bg-green-400 ml-auto" : "bg-gray-300"
            } w-max max-w-xs`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
