import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CategoryTab from "../components/Admin/CategoryTab.jsx";
import StoryTab from "../components/Admin/StoryTab.jsx";
import EpisodeTab from "../components/Admin/EpisodeTab.jsx";
import { useStoryStore } from "../stores/story.store.js";

export default function AdminTabsPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const { getStoryTypes, getAllEpisodes, deleteCategory, getAllStories } =
    useStoryStore();

  useEffect(() => {
    getStoryTypes();
    getAllStories();
    getAllEpisodes();
  }, [deleteCategory, getStoryTypes, getAllStories]);

  const tabs = ["Create Category", "Create Story", "Create Episode"];

  const tabContentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

      {/* Tab headers */}
      <div className="tabs tabs-boxed flex justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab ${activeTab === index ? "tab-active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-[300px] bg-base-100 border border-base-300 rounded-xl p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabContentVariants}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 0 && <CategoryTab />}
            {activeTab === 1 && <StoryTab />}
            {activeTab === 2 && <EpisodeTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
