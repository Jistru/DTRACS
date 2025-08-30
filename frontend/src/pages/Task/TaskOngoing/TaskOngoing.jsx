// src/pages/Task/TaskOngoing/TaskOngoing.jsx
import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import CreateTask from "../../../components/CreateTask/CreateTask";
import { PiClipboardTextBold } from "react-icons/pi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./TaskOngoing.css";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper: Parse date string
const parseDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") return new Date(0);
  const parts = dateStr.split(" ");
  if (parts.length < 3) return new Date(0);

  const [month, day, year] = parts;
  const monthNames = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };

  const monthIndex = monthNames[month];
  if (monthIndex === undefined || isNaN(parseInt(year))) return new Date(0);

  return new Date(parseInt(year), monthIndex, parseInt(day.replace(",", "")));
};

// Helper: Get weekday
const getWeekday = (dateStr) => {
  const date = parseDate(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const TaskOngoing = () => {
  const { upcomingTasks } = useOutletContext();
  const [tasks] = useState(upcomingTasks || []);
  const [expandedId, setExpandedId] = useState(null);
  const [collapsedDates, setCollapsedDates] = useState({});
  const navigate = useNavigate();

  // Group tasks by postDate
  const groupedByDate = tasks.reduce((groups, task) => {
    const date = task.postDate || "Unknown Date";
    if (!groups[date]) groups[date] = [];
    groups[date].push(task);
    return groups;
  }, {});

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => parseDate(b) - parseDate(a)
  );

  // Timer reference
  let leaveTimer = null;

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleDateCollapse = (date) => {
    setCollapsedDates(prev => ({
      ...prev,
      [date]: !prev[date]
    }));
  };

  return (
    <div className="ongoing-app">
      <main className="ongoing-main">
        {/* Create Task Button */}
        <CreateTask onTaskCreated={(newTask) => {
          toast.success("Task created!");
        }} />

        {sortedDates.length > 0 ? (
          sortedDates.map((date) => {
            const dateTasks = groupedByDate[date];
            const weekday = getWeekday(date);

            return (
              <div key={date} className="ongoing-date-group">
                <div className="ongoing-date-header">
                  <div>
                    <span className="ongoing-date-bold">{date}</span>
                    <span className="ongoing-weekday"> ({weekday})</span>
                  </div>
                  <div className="header-actions">
                    <span className="ongoing-task-count">{dateTasks.length} </span>
                    <span
                      className="ongoing-dropdown-arrow"
                      onClick={() => toggleDateCollapse(date)}
                      aria-label={collapsedDates[date] ? "Collapse" : "Expand"}
                    >
                      {collapsedDates[date] ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </span>
                  </div>
                </div>  

                {!collapsedDates[date] && dateTasks.map((task) => (
                  <div
                    key={task.id}
                    className="ongoing-card"
                    onMouseEnter={() => {
                      if (leaveTimer) {
                        clearTimeout(leaveTimer);
                        leaveTimer = null;
                      }
                    }}
                    onMouseLeave={() => {
                      leaveTimer = setTimeout(() => {
                        setExpandedId(null);
                      }, 300);
                    }}
                  >
                    <div
                      className="ongoing-card-content"
                      onClick={() => toggleExpand(task.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="ongoing-card-text">
                        <div className="ongoing-task-icon">
                          <PiClipboardTextBold className="icon-lg" />
                        </div>
                        <div>
                          <div className="ongoing-card-title">{task.title}</div>
                          <div className="ongoing-card-meta">
                            <span className="ongoing-office">{task.office}</span>
                          </div>
                        </div>
                      </div>

                      <div className="ongoing-card-deadline">
                        <span className="deadline-text">
                          Due on {task.dueDate} at{" "}
                          <span className="time">{task.dueTime}</span>
                        </span>
                      </div>
                    </div>

                    {expandedId === task.id && (
                      <div className="expanded-actions-ong">
                        {/* Description */}
                        <div className="expanded-description-ong">
                          <p>{task.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</p>
                        </div>
                        
                        {/* ✅ Fixed Stats on Right */}
                        <div className="task-stats-fixed">
                          <div className="stat-item-large">
                            <span className="stat-number">{task.submitted || 0}</span>
                            <span className="stat-label">Submitted</span>
                          </div>
                          <div className="stat-separator-large">|</div>
                          <div className="stat-item-large">
                            <span className="stat-number">{task.assigned || 0}</span>
                            <span className="stat-label">Assigned</span>
                          </div>
                        </div>
                        
                        {/* Button below */}
                        <button
                          className="view-description-btn-professional-ong"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/task/ongoing/${task.taskSlug}`);
                          }}
                        >
                          View Description
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div className="ongoing-no-tasks">No upcoming tasks</div>
        )}
      </main>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default TaskOngoing;