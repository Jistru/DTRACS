// src/components/TaskDetailComponents/TaskDescription/TaskDescription.jsx
import React from "react";
import { PiClipboardTextBold } from "react-icons/pi";

const TaskDescription = ({ task, focalName, section, description, status }) => {
  // ✅ Removed useNavigate and handleClick

  if (!task) return <p>Task not found.</p>;

  // Format postDate
  const postDate = new Date(task.postDate);
  const formattedPostDate = postDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  // Determine due date color
  const getDueTimeColor = () => {
    if (status === "history") {
      return <span className="task-due-history">{task.dueDate} {task.dueTime}</span>;
    }
    if (status === "pastdue") {
      return <span className="task-due-pastdue">{task.dueDate} {task.dueTime}</span>;
    }
    return <span className="task-due-ongoing">{task.dueDate} {task.dueTime}</span>;
  };

  return (
    <div className="task-description">
      {/* Task Header */}
      <div className="task-header">
        <div className="task-icon">
          <PiClipboardTextBold size={30} />
        </div>
        <h1>{task.title}</h1>
      </div>

      {/* Subheader */}
      <div className="task-subheader">
        <span className="task-section">{section || "No section"}</span>
        {getDueTimeColor()}
      </div>

      {/* Author + Posted Date */}
      <div className="task-meta">
        <span className="author">{focalName}</span>
        <span className="dot-space">•</span>
        <span className="posted">Posted on {formattedPostDate}</span>
      </div>

      {/* Description */}
      <div
        className="task-body"
        dangerouslySetInnerHTML={{ __html: description || "No description yet." }}
      />
    </div>
  );
};

export default TaskDescription;