import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function InvestorProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile from API using id
    // setProfile(data);
  }, [id]);

  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Investor Profile</h1>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Bio:</strong> {profile.bio}
      </p>
      <p>
        <strong>Interests:</strong> {profile.investmentInterests}
      </p>
    </div>
  );
}
