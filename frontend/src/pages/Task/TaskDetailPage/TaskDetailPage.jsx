// src/pages/TaskDetailPage/TaskDetailPage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io"; // ✅ Official icon — kept
import TaskDescription from "../../../components/TaskDetailComponents/TaskDescription/TaskDescription";
import SchoolStats from "../../../components/TaskDetailComponents/SchoolStats/SchoolStats";
import TaskViewComment from "../../../components/TaskDetailComponents/TaskViewComment/TaskViewComment";
import "./TaskDetailPage.css";

// Mock task data
const mockTasks = [
  {
    id: 1,
    title: "Finalize Quarterly School Performance Report",
    office: "School Management",
    dueDate: "October 15, 2025",
    dueTime: "11:59 PM",
    postDate: "October 1, 2025",
    description: "<p>Please finalize the <strong>Quarterly School Performance Report</strong> for all schools.</p>",
    taskSlug: "finalize-quarterly-school-performance-report",
  },
];

// Mock focal data
const mockFocal = {
  name: "Isidra L. Galman",
  section: "School Management",
};

const TaskDetailPage = () => {
  const { taskSlug } = useParams();
  const navigate = useNavigate();
  const task = mockTasks.find(t => t.taskSlug === taskSlug);

  if (!task) {
    return (
      <p style={{ color: 'red', textAlign: 'center', marginTop: '40px' }}>
        Task not found. Check the URL.
      </p>
    );
  }

  return (
    <div className="task-detail-page">
      {/* ✅ Back Button with Official Icon */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
        aria-label="Go back to task list"
      >
        <IoIosArrowBack size={20} />
        <span>Back</span>
      </button>

      {/* Main Content */}
      <div className="task-content">
        <TaskDescription
          task={task}
          focalName={mockFocal.name}
          section={mockFocal.section}
          description={task.description}
          status="ongoing"
        />

        <TaskViewComment />
      </div>

      {/* Right Side: Stats */}
      <div className="task-stats">
        <SchoolStats />
      </div>
    </div>
  );
};

export default TaskDetailPage;