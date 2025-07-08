import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStoryStore } from "../../stores/story.store";

export default function StoryTab() {
  const [subTab, setSubTab] = useState("create");
  const [typeId, setTypeId] = useState();

  const {
    storyTypes,
    getAllStories,
    AllStories,
    createStoryByCategoryId,
    deleteStoryById,
  } = useStoryStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    img: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
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
    await createStoryByCategoryId(formData, typeId);
  };

  const handelDelete = async (storyId) => {
    await deleteStoryById(storyId);
    getAllStories();
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
              <h2 className="text-xl font-semibold">Add New Story</h2>
              <input
                type="text"
                placeholder="Story Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="input input-bordered w-full"
                required
              />
              <textarea
                placeholder="Short Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input file-input-bordered w-full"
              />
              <select
                onChange={(e) => setTypeId(e.target.value)}
                className="select select-bordered w-full"
                required
              >
                <option disabled selected>
                  Choose Category
                </option>
                {storyTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.title}
                  </option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">
                Create Story
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
            <h2 className="text-xl font-semibold mb-4">Delete Stories</h2>
            <ul className="space-y-2">
              {AllStories.map((story) => (
                <li
                  key={story._id}
                  className="flex justify-between items-center p-2 border rounded-md"
                >
                  <span>{story.title}</span>
                  <button
                    onClick={() => handelDelete(story._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
