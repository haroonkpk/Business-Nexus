import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStoryStore } from "../../stores/story.store";
import toast from "react-hot-toast";

export default function EpisodeTab() {
  const [subTab, setSubTab] = useState("create");
  const [storyId, setStoryId] = useState();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
  });
  const {
    AllStories,
    createEpisodeByStoryId,
    getAllEpisodes,
    deleteEpisodeById,
    AllEpisodes,
    loading,
  } = useStoryStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handelSubmitForm = async (e) => {
    e.preventDefault();
    await createEpisodeByStoryId(formData, storyId);
  };

  const handelDelete = async (episodeId) => {
    await deleteEpisodeById(episodeId);
    getAllEpisodes();
  };

  return (
    <div>
      <div className="tabs mb-4">
        <a
          className={`tab tab-bordered ${
            subTab === "create" ? "tab-active" : ""
          }`}
          onClick={() => setSubTab("create")}
        >
          ➕ Create
        </a>
        <a
          className={`tab tab-bordered ${
            subTab === "delete" ? "tab-active" : ""
          }`}
          onClick={() => setSubTab("delete")}
        >
          ❌ Delete
        </a>
      </div>

      <AnimatePresence mode="wait">
        {subTab === "create" ? (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handelSubmitForm} className="space-y-4">
              <h2 className="text-xl font-semibold">Add New Episode</h2>
              <select
                onChange={(e) => setStoryId(e.target.value)}
                className="select select-bordered w-full"
                required
              >
                <option disabled selected>
                  Choose Story
                </option>
                {AllStories.map((story) => (
                  <option key={story._id} value={story._id}>
                    {story.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Episode Title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={handleImageChange}
                required
              />
              <textarea
                placeholder="Episode Description"
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Create Episode
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="delete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Delete Episodes</h2>

            {loading ? (
              <ul className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center p-2 border rounded-md animate-pulse"
                  >
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="btn btn-sm btn-error opacity-50 pointer-events-none">
                      Delete
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-2">
                {AllEpisodes.map((ep) => (
                  <li
                    key={ep._id}
                    className="flex justify-between items-center p-2 border rounded-md"
                  >
                    <span>{ep.title}</span>
                    <button
                      onClick={() => handelDelete(ep._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
