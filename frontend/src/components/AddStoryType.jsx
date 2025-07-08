import { useState } from "react";
import { axiosInstance } from "../lib/axios.js";

export default function AddStoryType() {
  const [title, setTitle] = useState("");

  const handleAddType = async () => {
    try {
      await axiosInstance.post("/story/addType", { title });
      alert("Story Type Added");
      setTitle("");
    } catch (err) {
      console.error("Failed to add type", err);
    }
  };

  return (
    <div className=" p-4 rounded">
      <h2 className="text-xl font-semibold mb-2">Add Story Type</h2>
      <input
        type="text"
        className="input input-bordered w-full mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Type Title"
      />
      <button className="btn btn-primary" onClick={handleAddType}>
        Add Type
      </button>
    </div>
  );
}
