import React, { useState } from "react";
import FlowChart from "../components/FlowChart";
import { generateFlow } from "../api/gemini";

const Home = () => {
  const [input, setInput] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError("Please enter a description");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const data = await generateFlow(input);
      if (data.nodes && data.nodes.length > 0) {
        setNodes(data.nodes);
        setEdges(data.edges || []);
      } else {
        setError("Could not generate flowchart. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please check your API key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom right, #eff6ff, #faf5ff)",
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1f2937", marginBottom: "0.5rem" }}>
          🎯 AI Project Flow Generator
        </h1>
        <p style={{ color: "#4b5563", marginBottom: "2rem" }}>
          Describe your website structure and watch it transform into a flowchart
        </p>

        <div style={{ 
          background: "white", 
          borderRadius: "0.75rem", 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          padding: "1.5rem",
          marginBottom: "2rem"
        }}>
          <textarea
            style={{ 
              width: "100%", 
              height: "128px", 
              padding: "1rem", 
              border: "2px solid #e5e7eb", 
              borderRadius: "0.5rem",
              outline: "none",
              fontSize: "1rem",
              fontFamily: "inherit"
            }}
            placeholder="Example: Create a flowchart for an e-commerce website with: Homepage, Product listing page, Product detail page, Shopping cart, Checkout process, Order confirmation page, User account dashboard..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          
          {error && (
            <div style={{ marginTop: "0.5rem", color: "#ef4444", fontSize: "0.875rem" }}>{error}</div>
          )}
          
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              background: loading ? "#9ca3af" : "linear-gradient(to right, #2563eb, #9333ea)",
              color: "white",
              fontWeight: "600",
              borderRadius: "0.5rem",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              transition: "all 0.2s"
            }}
          >
            {loading ? "Generating..." : "Generate Flowchart"}
          </button>
        </div>

        {nodes.length > 0 && (
          <div style={{ 
            background: "white", 
            borderRadius: "0.75rem", 
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            padding: "1.5rem"
          }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1f2937", marginBottom: "1rem" }}>
              Your Flowchart
            </h2>
            <FlowChart nodes={nodes} edges={edges} />
          </div>
        )}

        {/* Example prompts */}
        <div style={{ 
          marginTop: "2rem", 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
          gap: "1rem" 
        }}>
          <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>📝 Example 1: E-commerce</h3>
            <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>Create a flowchart for an e-commerce website with: Homepage, Product listing page with categories, Product detail page with reviews, Shopping cart, Checkout process, Order confirmation, User dashboard</p>
          </div>
          <div style={{ background: "white", padding: "1rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ fontWeight: "600", color: "#374151", marginBottom: "0.5rem" }}>📝 Example 2: Blog</h3>
            <p style={{ fontSize: "0.875rem", color: "#4b5563" }}>Create a flowchart for a blog with: Homepage, Blog posts list, Single post page, Categories page, About page, Contact form, Admin dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;