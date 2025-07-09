import { useAuthStore } from "../stores/auth.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EntrepreneurDashboard() {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authUser || authUser.role !== "entrepreneur") navigate("/login");
  // }, [authUser, navigate]);

  // if (!authUser || authUser.role !== "entrepreneur") return null;

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white">
      <h1 className="text-3xl font-bold mb-6">Entrepreneur Dashboard</h1>
      <ul className="list-disc ml-5 space-y-2">
        <li>Send collaboration requests to investors</li>
        <li>Track request status (accepted/rejected)</li>
        <li>View list of interested investors</li>
        <li>Real-time chat with investors</li>
        <li>Update your entrepreneur profile</li>
      </ul>
    </div>
  );
}
