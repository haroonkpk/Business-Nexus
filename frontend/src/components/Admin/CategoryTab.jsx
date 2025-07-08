import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStoryStore } from "../../stores/story.store";

export default function CategoryTab() {
  const [subTab, setSubTab] = useState("create");

  return (
    <div>
      {/* Sub-tabs for Create / Delete */}
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

      {/* Animated Switch */}
      <AnimatePresence mode="wait">
        {subTab === "create" ? (
          <motion.div
            key="create"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CreateCategoryForm />
          </motion.div>
        ) : (
          <motion.div
            key="delete"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <DeleteCategoryList />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ========================== FORMS ===============================

function CreateCategoryForm() {
  const [imagePreview, setImagePreview] = useState(null);
  const { createCategory, getStoryTypes } = useStoryStore();
  const [formData, setFormData] = useState({
    img: imagePreview,
    title: "",
    description: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({ ...prev, img: reader.result }));
    };
    reader.readAsDataURL(file);
  };
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handelSubmitForm = async (e) => {
    e.preventDefault();
    await createCategory(formData);
    getStoryTypes();
  };
  return (
    <form className="space-y-4" onSubmit={handelSubmitForm}>
      <h2 className="text-xl font-semibold">Add New Category</h2>
      <input
        type="text"
        placeholder="Category title"
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        className="input input-bordered w-full"
        required
      />
      <input
        type="text"
        placeholder="Category descrition"
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        className="input input-bordered w-full"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="file-input file-input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary">
        Create Category
      </button>
    </form>
  );
}

function DeleteCategoryList() {
  const { storyTypes, getStoryTypes, deleteCategory } = useStoryStore();
  const handleDelete = async (id) => {
    await deleteCategory(id);
    getStoryTypes();
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Delete Categories</h2>
      <ul className="space-y-2">
        {storyTypes.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between items-center p-2 border rounded-md"
          >
            <span>{cat.title}</span>
            <button
              onClick={() => handleDelete(cat._id)}
              className="btn btn-sm btn-error"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  cat._id;
}
