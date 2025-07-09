import { useAuthStore } from "../stores/auth.store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InvestorDashboard() {
  const { authUser } = useAuthStore();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authUser || authUser.role !== "investor") navigate("/login");
  // }, [authUser, navigate]);

  // if (!authUser || authUser.role !== "investor") return null;

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white">
      <h1 className="text-3xl font-bold mb-6">Investor Dashboard</h1>
      <ul className="list-disc ml-5 space-y-2">
        <li>View collaboration requests from entrepreneurs</li>
        <li>Browse entrepreneurs seeking funding</li>
        <li>Accept or reject collaboration requests</li>
        <li>Real-time chat with connected entrepreneurs</li>
        <li>Update your investor profile</li>
      </ul>
    </div>
  );
}
