export default function SkeletonCard() {
  return (
    <div className="bg-base-200 rounded-2xl shadow-md p-4 max-w-md w-full animate-pulse">
      <div className="w-full h-48 bg-base-100 rounded-xl mb-4"></div>

      <div className="absolute top-2 left-2">
        <div className="bg-purple-600 rounded-full h-5 w-12"></div>
      </div>

      <div className="h-5 bg-base-100 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-base-100 rounded w-full"></div>
      <div className="h-4 bg-base-100 rounded w-5/6 mt-1"></div>
    </div>
  );
}
