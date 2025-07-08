export default function EpisodeDetailSkeleton() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-base-300 px-4 md:px-10 py-8 animate-pulse"
    >
      {/* Back Button Placeholder */}
      <div className="mb-6 flex items-center gap-2 text-blue-500">
        <div className="w-5 h-5 bg-blue-300 rounded-full rotate-180"></div>
        <div className="h-4 w-24 bg-blue-300 rounded"></div>
      </div>

      {/* Title */}
      <div className="h-6 md:h-10 w-3/4 mx-auto bg-base-100 rounded mb-6"></div>

      {/* Image Placeholder */}
      <div className="w-full max-h-[400px] h-56 md:h-72 bg-base-100 rounded-xl shadow-inner mb-8"></div>

      {/* Description Placeholder */}
      <div className="bg-base-100 p-6 md:p-10 rounded-xl shadow-lg space-y-4">
        <div className="h-4 w-full bg-base-200 rounded"></div>
        <div className="h-4 w-5/6 bg-base-200 rounded"></div>
        <div className="h-4 w-4/6 bg-base-200 rounded"></div>
        <div className="h-4 w-3/4 bg-base-200 rounded"></div>
        <div className="h-4 w-full bg-base-200 rounded"></div>
        <div className="h-4 w-2/3 bg-base-200 rounded"></div>
      </div>
    </div>
  );
}
