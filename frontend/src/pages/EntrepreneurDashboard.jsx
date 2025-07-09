import { useEffect, useState } from "react";

export default function EntrepreneurDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch collaboration requests
    // setRequests(data);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Entrepreneur Dashboard</h1>
      {requests.map((r) => (
        <div key={r._id} className="mb-4 p-4 bg-white shadow rounded-xl">
          <p>
            <strong>From:</strong> {r.investorName}
          </p>
          <p>
            <strong>Status:</strong> {r.status}
          </p>
        </div>
      ))}
    </div>
  );
}
