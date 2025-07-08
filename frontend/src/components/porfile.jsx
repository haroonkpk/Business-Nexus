import { LogOutIcon } from "lucide-react";
import { useAuthStore } from "../stores/auth.store.js";
import FavoriteItem from "./FavoriteItem.jsx";
import LogoutConfirmDialog from "./LogoutConfirmDialog.jsx";
import { useEffect, useState } from "react";
import { useStoryStore } from "../stores/story.store.js";

export default function Profile() {
  const { authUser, LogOut } = useAuthStore();
  const { getAddToFavotrites, favorites, loading } = useStoryStore();
  const [showConfirm, setShowConfirm] = useState(false);
  

  useEffect(() => {
    getAddToFavotrites();
  }, []);

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box max-w-2xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <div className="mb-4">
          <h2 className="font-bold text-lg">
            <span className="text-xl">{authUser.username}</span>{" "}
            <span className="text-sm text-gray-600">Your favorite stories</span>
          </h2>
        </div>

        <div className="space-y-3">
          {loading ? (
            Array(4)
              .fill({})
              .map((_, i) => <FavoriteItem key={i} isLoading={true} />)
          ) : favorites.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No favorite stories yet.
            </div>
          ) : (
            favorites.map((item, i) => (
              <FavoriteItem
                key={i}
                storyId={item.story?._id}
                img={item.story?.img}
                title={item.story?.title}
                desc={item.story?.type?.title}
                isLoading={loading}
              />
            ))
          )}
        </div>

        {/* 🔻 Moved logout button to bottom */}
        <div className="mt-6 text-right">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center space-x-2 text-red-500 btn-ghost btn rounded-2xl"
          >
            <LogOutIcon size={20} />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>

        {showConfirm && (
          <LogoutConfirmDialog
            onConfirm={() => {
              setShowConfirm(false);
              LogOut();
            }}
            onCancel={() => setShowConfirm(false)}
          />
        )}
      </div>
    </dialog>
  );
}
