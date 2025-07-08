import React, { useEffect } from "react";
import { useStoryStore } from "../stores/story.store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Card from "../components/Card";
import SkeletonCard from "../components/SkeletonCard";

export default function EpisodePage() {
  const { storyId } = useParams();
  const { getEpisodesByStoryId, episodes, loading } = useStoryStore();
  const navigate = useNavigate();

  useEffect(() => {
    getEpisodesByStoryId(storyId);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-base-300 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Episodes</h1>

      <div className="flex mb-6 items-center gap-4 p-1 pb-2 text-xs opacity-60 tracking-wide">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back
        </button>
        <span>{episodes?.length || 0} episodes</span>
      </div>

      {loading || episodes === null ? (
        // Skeleton while loading or when episodes are not fetched yet
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : episodes.length === 0 ? (
        // No episodes found
        <div className="flex flex-col justify-center items-center text-center py-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
            alt="No episodes"
            className="w-28 h-28 opacity-70 mb-4 animate-bounce"
          />
          <h2 className="text-xl font-semibold text-base-content/70 animate-bounce">
            No Episodes Found
          </h2>
          <p className="text-sm text-base-content/50 mt-2 max-w-xs">
            It looks like there are no episodes for this story yet. Please check
            back later!
          </p>
        </div>
      ) : (
        // Episodes list
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((episode, index) => (
            <Link to={`/episode/${episode._id}`} key={episode._id}>
              <Card index={index} arr={episode} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
