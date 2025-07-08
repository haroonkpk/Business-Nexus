import { useState, useEffect } from "react";

export default function VoiceTest() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voice, setVoice] = useState(null);
  const text = "مجھے ابھی پتا چلا کہ یہ مسئلہ کیا تھا";

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const hindiVoice = voices.find((v) => v.lang === "hi-IN");
      setVoice(hindiVoice || voices[0]); // fallback if hindi not available
    };

    // Safari/Chrome may load voices async
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const speak = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = voice;
    utter.lang = voice?.lang || "hi-IN";
    utter.rate = 0.95;

    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="p-10">
      <button
        onClick={speak}
        className={`px-4 py-2 rounded text-white ${
          isSpeaking ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {isSpeaking ? "⏹️ روک دو" : "🔊 سنو ٹیسٹ"}
      </button>
    </div>
  );
}
