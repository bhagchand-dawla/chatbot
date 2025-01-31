import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-2xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">AI Document Q&A</h1>
        <p className="text-lg text-gray-700 mb-6">
          Upload documents and get AI-powered insights instantly.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg text-left shadow-md mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">About This Chatbot</h2>
          <ul className="list-disc pl-5 text-gray-700 text-sm">
            <li>Built with <strong>React + Vite</strong> for a fast frontend experience.</li>
            <li>Backend powered by <strong>FastAPI</strong> for efficient processing.</li>
            <li>Data stored in <strong>MongoDB</strong> for scalable document handling.</li>
            <li>AI Model: <strong>Anthropic API</strong> for intelligent answers.</li>
            <li>Developed by <strong>Bhagchand Dawla</strong>.</li>
            <li>Supports document queries, including <strong>.xlsx file processing</strong>.</li>
          </ul>
        </div>
        <Link
          to="/upload"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-full shadow-lg text-lg"
        >
          Upload a Document
        </Link>
      </div>
    </div>
  );
};

export default Home;