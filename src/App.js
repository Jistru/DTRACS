import { useState } from "react";
import "./App.css";

export default function App() {
  // 🔹 Change this to your backend base URL
  const BACKEND_BASE_URL = "http://192.168.90.124:8000";

  const [route, setRoute] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [showBody, setShowBody] = useState(false); // ✅ Toggle JSON body
  const [params, setParams] = useState([{ key: "", value: "" }]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleParamChange = (index, field, value) => {
    const newParams = [...params];
    newParams[index][field] = value;
    setParams(newParams);
  };

  const addParam = () => setParams([...params, { key: "", value: "" }]);
  const removeParam = (index) =>
    setParams(params.filter((_, i) => i !== index));

  const testRoute = async () => {
    if (!route) return;

    setLoading(true);
    setError("");
    setResponse(null);

    try {
      let options = { method };

      // 🔹 Build full backend URL
      let finalRoute = route.startsWith("http")
        ? route
        : BACKEND_BASE_URL + route;

      // 🔹 Collect parameters
      const paramObj = {};
      params.forEach((p) => {
        if (p.key.trim()) {
          paramObj[p.key.trim()] = p.value;
        }
      });

      if (method === "GET") {
        // Attach params to query string
        const searchParams = new URLSearchParams(paramObj).toString();
        if (searchParams) {
          finalRoute += finalRoute.includes("?")
            ? "&" + searchParams
            : "?" + searchParams;
        }
      } else if (method === "POST" || method === "PUT") {
        if (showBody) {
          // ✅ Send raw JSON body if user enabled it
          if (body.trim()) {
            try {
              const parsedBody = JSON.parse(body);
              options.headers = { "Content-Type": "application/json" };
              options.body = JSON.stringify(parsedBody);
            } catch (e) {
              setError("❌ Invalid JSON body");
              setLoading(false);
              return;
            }
          }
        } else if (Object.keys(paramObj).length > 0) {
          // ✅ Otherwise send params as JSON body
          options.headers = { "Content-Type": "application/json" };
          options.body = JSON.stringify(paramObj);
        }
      }

      options.mode = "cors";

      const res = await fetch(finalRoute, options);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await res.json();
      } else {
        result = await res.text();
      }

      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h2 className="title">Backend Route Tester 🚀</h2>

      {/* Route input */}
      <div className="row">
        <input
          type="text"
          placeholder="Enter backend route... e.g. /school/account/123"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
          className="input route-input"
        />

        <select
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            setShowBody(false); // Reset body visibility on method change
            setBody("");
          }}
          className="select"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <button onClick={testRoute} className="btn send-btn">
          Send
        </button>
      </div>

      {/* Parameters */}
      <div className="params-container">
        <h4>Parameters</h4>
        {params.map((p, index) => (
          <div key={index} className="param-row">
            <input
              type="text"
              placeholder="Key"
              value={p.key}
              onChange={(e) => handleParamChange(index, "key", e.target.value)}
              className="input small-input"
            />
            <input
              type="text"
              placeholder="Value"
              value={p.value}
              onChange={(e) => handleParamChange(index, "value", e.target.value)}
              className="input small-input"
            />
            <button
              onClick={() => removeParam(index)}
              className="btn remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
        <button onClick={addParam} className="btn add-btn">
          + Add Param
        </button>
      </div>

      {/* Toggle JSON Body */}
      {(method === "POST" || method === "PUT") && (
        <div className="body-toggle">
          <button onClick={() => setShowBody(!showBody)} className="btn add-btn">
            {showBody ? "Remove JSON Body" : "Add JSON Body"}
          </button>

          {showBody && (
            <textarea
              placeholder='Enter JSON body... e.g. {"name":"John"}'
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="textarea"
            />
          )}
        </div>
      )}

      {/* Response */}
      <div className="response-container">
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {response && (
          <pre className="response-box">
            {typeof response === "object"
              ? JSON.stringify(response, null, 2)
              : response}
          </pre>
        )}
      </div>
    </div>
  );
}
