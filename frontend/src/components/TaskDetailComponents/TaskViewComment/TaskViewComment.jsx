// src/components/TaskDetailComponents/TaskViewComment/TaskViewComment.jsx
import React, { useState } from "react";
import "./TaskViewComment.css";

const mockComments = [
  {
    id: 1,
    author: "Juan Dela Cruz",
    role: "BINHS",
    date: "Aug 28, 2025 9:37 AM",
    text: "We will submit the document tomorrow.",
  },
  {
    id: 2,
    author: "Maria Santos",
    role: "SV5A",
    date: "Aug 27, 2025 3:10 PM",
    text: "We’re preparing the documents.",
  },
  {
    id: 3,
    author: "Edward R. Manuel",
    role: "Planning & Research",
    date: "Aug 27, 2025 2:15 PM",
    text: "Reminder: submission deadline is Aug 30.",
  },
];

const TaskViewComment = () => {
  const [comments] = useState(mockComments);

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {/* Comments List */}
      <div className="comment-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-card">
            <div className="comment-header">
              <span className="author">{c.author}</span>
              <span className="role">({c.role})</span>
              <span className="date">{c.date}</span>
            </div>
            <p className="comment-text">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskViewComment;