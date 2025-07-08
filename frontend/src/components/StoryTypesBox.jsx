import { useStoryStore } from "../stores/story.store.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "./Card.jsx";

export default function StoryBox() {
  const { getStoryTypes, storyTypes } = useStoryStore();

  useEffect(() => {
    getStoryTypes();
  }, []);

  return (
    <div className="w-full bg-base-300 p-3 rounded-box sm:shadow-md max-w-6xl sm:p-6">
      <div className="flex justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Type of stories</h1>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        <li className="hidden col-span-full sm:flex items-center gap-4 p-1 pb-2 text-xs opacity-60 tracking-wide">
          Featured Stories
        </li>
        {storyTypes.map((type, index) => (
          <Link to={`/stories/${type._id}`} key={index + 1}>
            <div className="flex flex-wrap justify-items-center">
              <Card arr={type} />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}
