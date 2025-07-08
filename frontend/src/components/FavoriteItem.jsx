import { X } from "lucide-react";
import { useStoryStore } from "../stores/story.store";
import { useNavigate } from "react-router-dom";

export default function FavoriteItem({ storyId, img, title, desc, isLoading }) {
  const { removeFavorite } = useStoryStore();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex gap-4 items-start animate-pulse p-3 rounded-xl bg-gray-100">
        <div className="w-16 h-16 bg-gray-300 rounded-md" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  const handleremove = async () => {
    await removeFavorite(storyId);
  };

  const handleNavigate = () => {
    const dialog = document.getElementById("my_modal_3");
    dialog?.close(); // Close the dialog
    navigate(`/episodes/${storyId}`); // Navigate to Episodes
  };

  return (
    <>
      <div className="flex gap-4 items-start bg-base-200 p-3 rounded-xl shadow-sm relative group">
        <img
          onClick={handleNavigate}
          src={img}
          alt={title}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs">{desc}</p>
        </div>

        <button
          onClick={handleremove}
          className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-100 transition"
        >
          <X size={16} />
        </button>
      </div>
    </>
  );
}
