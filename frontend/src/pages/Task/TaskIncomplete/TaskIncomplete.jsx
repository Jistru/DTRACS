// src/pages/Task/TaskIncomplete/TaskIncomplete.jsx
import React, { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { PiClipboardTextBold } from "react-icons/pi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./TaskIncomplete.css";

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

const TaskIncomplete = () => {
  // ✅ Get past-due tasks from context
  const { pastDueTasks } = useOutletContext();
  const [tasks] = useState(pastDueTasks || []);
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
    <div className="incomplete-app">
      <main className="incomplete-main">
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => {
            const dateTasks = groupedByDate[date];
            const weekday = getWeekday(date);

            return (
              <div key={date} className="incomplete-date-group">
                <div className="incomplete-date-header">
                  <div>
                    <span className="incomplete-date-bold">{date}</span>
                    <span className="incomplete-weekday"> ({weekday})</span>
                  </div>
                  <div className="header-actions">
                    <span className="incomplete-task-count">{dateTasks.length} </span>
                    <span
                      className="incomplete-dropdown-arrow"
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
                      className="incomplete-card"
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
                        className="incomplete-card-content"
                        onClick={() => toggleExpand(task.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="incomplete-card-text">
                          <div className="incomplete-task-icon">
                            <PiClipboardTextBold className="icon-lg" />
                          </div>
                          <div>
                            <div className="incomplete-card-title">{task.title}</div>
                            <div className="incomplete-card-meta">
                              <span className="incomplete-office">{task.office}</span>
                            </div>
                          </div>
                        </div>

                        <div className="incomplete-card-deadline">
                          <span className="deadline-text">
                            Due on {task.dueDate} at{" "}
                            <span className="time">{task.dueTime}</span>
                          </span>
                        </div>
                      </div>

                      {expandedId === task.id && (
                        <div className="expanded-actions-inc">
                          {/* Description */}
                          <div className="expanded-description-inc">
                            <p>{task.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</p>
                          </div>

                          {/* ✅ Fixed Stats on Right */}
                          <div className="task-stats-fixed">
                            <div className="stat-item1-large-inc">
                              <span className="stat-number1-inc">{task.submitted || 0}</span>
                              <span className="stat-label1">Submitted</span>
                            </div>
                            <div className="stat-separator-large">|</div>
                            <div className="stat-item2-large-inc">
                              <span className="stat-number2-inc">{task.assigned || 0}</span>
                              <span className="stat-label2">Assigned</span>
                            </div>
                          </div>

                          {/* Button below */}
                          <button
                            className="view-description-btn-professional-inc"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/task/incomplete/${task.taskSlug}`);
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
          <div className="incomplete-no-tasks">No past-due tasks.</div>
        )}
      </main>
    </div>
  );
};

export default TaskIncomplete;