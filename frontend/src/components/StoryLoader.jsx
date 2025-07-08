import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function StoryLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="w-32 h-32 filter invert">
        <DotLottieReact
          src="https://lottie.host/a1ffc1d3-48e2-44c9-ae58-8ff050345f33/9JNqDIPdl5.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
}
