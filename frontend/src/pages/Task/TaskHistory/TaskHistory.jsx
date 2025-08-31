// src/pages/Task/TaskHistory/TaskHistory.jsx
import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { PiClipboardTextBold } from "react-icons/pi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./TaskHistory.css";

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

const TaskHistory = () => {
  const { completedTasks } = useOutletContext();
  const [tasks] = useState(completedTasks || []);
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
    setCollapsedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div className="history-app">
      <main className="history-main">
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => {
            const dateTasks = groupedByDate[date];
            const weekday = getWeekday(date);

            return (
              <div key={date} className="history-date-group">
                <div className="history-date-header">
                  <div>
                    <span className="history-date-bold">{date}</span>
                    <span className="history-weekday"> ({weekday})</span>
                  </div>
                  <div className="header-actions">
                    <span className="history-task-count">{dateTasks.length} </span>
                    <span
                      className="history-dropdown-arrow"
                      onClick={() => toggleDateCollapse(date)}
                      aria-label={collapsedDates[date] ? "Collapse" : "Expand"}
                    >
                      {collapsedDates[date] ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    </span>
                  </div>
                </div>

                {!collapsedDates[date] &&
                  dateTasks.map((task) => (
                    <div
                      key={task.id}
                      className="history-card"
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
                        className="history-card-content"
                        onClick={() => toggleExpand(task.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="history-card-text">
                          <div className="history-task-icon">
                            <PiClipboardTextBold className="icon-lg" />
                          </div>
                          <div>
                            <div className="history-card-title">{task.title}</div>
                            <div className="history-card-meta">
                              <span className="history-office">{task.office}</span>
                            </div>
                          </div>
                        </div>

                        <div className="history-card-completion">
                          <span className="history-text">
                            ✔ Completed at{" "}
                            <span className="time">{task.completedTime || task.dueTime}</span>
                          </span>
                        </div>
                      </div>

                      {expandedId === task.id && (
                      <div className="expanded-actions-his">
                        {/* Description */}
                        <div className="expanded-description-his">
                          <p>{task.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}</p>
                        </div>

                        {/* ✅ Fixed Stats on Right */}
                        <div className="task-stats-fixed">
                          <div className="stat-item1-large-his">
                            <span className="stat-number1-his">{task.submitted || 0}</span>
                            <span className="stat-label1">Submitted</span>
                          </div>
                          <div className="stat-separator-large">|</div>
                          <div className="stat-item2-large-his">
                            <span className="stat-number2-his">{task.assigned || 0}</span>
                            <span className="stat-label2">Assigned</span>
                          </div>
                        </div>

                        {/* Button below */}
                        <button
                          className="view-description-btn-professional-his"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/task/history/${task.taskSlug}`);
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
          <div className="history-no-tasks">No completed tasks.</div>
        )}
      </main>
    </div>
  );
};

export default TaskHistory;