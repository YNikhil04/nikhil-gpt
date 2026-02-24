import { useState } from "react";
import "./App.css";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState(
    "Hello, I will Give you the Response..!!",
  );
  const [loading, setLoading] = useState(false);

  const submitPrompt = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAiResponse("Thinking...");

    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
      });

      // If the server isn't running, fetch throws an error here
      const data = await response.json();

      if (data.success) {
        setAiResponse(data.answer);
      } else {
        setAiResponse("Error: " + data.error);
      }
    } catch (err) {
      console.error("Connection Error:", err);
      setAiResponse(
        "Backend is not running. Please start the server on port 5000.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <div className="App">
        <form className="container" onSubmit={submitPrompt}>
          <h1 className="title">
            Hello User <br /> Welcome to NIKHIL GPT
          </h1>

          <div className="input-group">
            <label htmlFor="text" className="label">
              Enter the Text
            </label>
            <br />
            <input
              type="text"
              id="text"
              className="text-input"
              placeholder="Type your prompt here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              required
            />
          </div>

          <button className="generate-btn" type="submit" disabled={loading}>
            {loading ? "Generating..." : "Generate Response"}
          </button>
        </form>
      </div>

      <div className="response">
        <div className="container-response">
          {/* We use aiResponse state here to show the answer */}
          <h1 className="answer">{aiResponse}</h1>
        </div>
      </div>
    </div>
  );
}
