import React, { useState } from "react";
import axios from "../utils/api";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    if (!file.name.endsWith(".xlsx")) {
      return alert("Invalid file format. Please upload an .xlsx file.");
    }
  
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000, // Increase timeout to 60 seconds if needed
      });
  
      if (response.status === 200 && response.data.message === "New file uploaded and converted successfully") {
        alert("Upload successful! Redirecting..."); // Show alert first
        navigate("/qa"); // Then navigate to Q&A page
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("An error occurred while uploading.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Your Document</h2>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <button
          onClick={handleFileUpload}
          className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded-lg shadow-md"
          disabled={loading}
        >
          {loading ? <ClipLoader color="white" size={20} /> : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
