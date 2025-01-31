import React, { useState, useEffect, useRef } from "react";
import axios from "../utils/api";

const QAInterface = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! Ask me anything.", sender: "bot" },
  ]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
  
    const newMessages = [...messages, { text: question, sender: "user" }];
    setMessages(newMessages);
    setQuestion("");
  
    // Show "Thinking..." while waiting for the response
    setMessages((prev) => [...prev, { text: "Thinking...", sender: "bot" }]);
  
    try {
      // Wait 2 seconds before making the request
      await new Promise((resolve) => setTimeout(resolve, 2000));
  
      const response = await axios.get("http://127.0.0.1:8000/qa", { params: { question } });
  
      setMessages((prev) => [
        ...prev.slice(0, -1), // Remove "Thinking..."
        { text: response.data.answer, sender: "bot" }, // Show only the answer
      ]);
    } catch (error) {
      console.error("Error fetching answer:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { text: "Sorry, I couldn't fetch an answer.", sender: "bot" },
      ]);
    }
  };
  

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-900 text-white p-5">
      <div className="flex-1 overflow-y-auto space-y-3 p-5 bg-gray-800 shadow-md rounded-lg mx-auto w-full max-w-3xl border border-gray-700 mt-5" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xl ${
              msg.sender === "bot"
                ? "bg-blue-500 text-white self-start"
                : "bg-green-500 text-white self-end"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2 p-4 bg-gray-800 shadow-md w-full max-w-3xl mx-auto border border-gray-700 rounded-lg">
        <input
          type="text"
          placeholder="Ask something..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 border p-3 rounded-lg bg-gray-700 text-white"
        />
        <button
          onClick={handleAskQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default QAInterface;
