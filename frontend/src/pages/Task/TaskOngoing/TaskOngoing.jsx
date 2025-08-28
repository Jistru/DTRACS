// src/pages/Task/TaskOngoing/TaskOngoing.jsx
import React, { useState, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import CreateTask from "../../../components/CreateTask/CreateTask";
import { PiClipboardTextBold } from "react-icons/pi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./TaskOngoing.css";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Safe date parser
const parseDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") return new Date(0); // fallback

  const parts = dateStr.split(" ");
  if (parts.length < 3) return new Date(0);

  const [month, day, year] = parts;
  const monthNames = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };

  return new Date(
    parseInt(year) || 0,
    monthNames[month] ?? 0,
    parseInt(day?.replace(",", "")) || 1
  );
};

// Helper: Get weekday from date string
const getWeekday = (dateStr) => {
  const date = parseDate(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const TaskOngoing = () => {
  const { upcomingTasks } = useOutletContext();
  const [tasks, setTasks] = useState(upcomingTasks || []);

  // ✅ prevent duplicate toasts
  const lastTaskId = useRef(null);

  const handleCreateTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);

    // Show toast only if this task hasn't been toasted yet
    if (lastTaskId.current !== newTask.id) {
      toast.success("Task created successfully!");
      lastTaskId.current = newTask.id;
    }
  };

  // Group tasks by postDate
  const groupedByDate = tasks.reduce((groups, task) => {
    const date = task.postDate || "Unknown Date";
    if (!groups[date]) groups[date] = [];
    groups[date].push(task);
    return groups;
  }, {});

  // Sort dates: newest first (ignores "Unknown Date")
  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => parseDate(b) - parseDate(a)
  );

  const [openGroups, setOpenGroups] = useState(() =>
    sortedDates.reduce((acc, date) => ({ ...acc, [date]: true }), {})
  );

  const toggleGroup = (date) => {
    setOpenGroups((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));
  };

  return (
    <div className="ongoing-app">
      <main className="ongoing-main">
        <CreateTask onTaskCreated={handleCreateTask} />

        {sortedDates.length > 0 ? (
          sortedDates.map((date) => {
            const dateTasks = groupedByDate[date];
            const weekday = getWeekday(date);
            const isOpen = openGroups[date];

            return (
              <div key={date} className="ongoing-date-group">
                <div
                  className="ongoing-date-header"
                  onClick={() => toggleGroup(date)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  <span className="ongoing-date-bold">{date}</span>
                  <span className="ongoing-weekday"> ({weekday})</span>

                  <div className="header-actions">
                    <span className="ongoing-task-count">
                      {dateTasks.length}
                    </span>
                    <span
                      className="ongoing-dropdown-arrow"
                      aria-label={isOpen ? "Collapse" : "Expand"}
                    >
                      {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                  </div>
                </div>

                {isOpen && (
                  <div className="ongoing-task-list">
                    {dateTasks.map((task) => (
                      <Link
                        to={`/task/ongoing/${task.taskSlug}`}
                        className="ongoing-task-link"
                        key={task.id}
                      >
                        <div className="ongoing-card">
                          <div className="ongoing-card-content">
                            <div className="ongoing-card-text">
                              <div className="ongoing-task-icon">
                                <PiClipboardTextBold className="icon-lg" />
                              </div>
                              <div>
                                <div className="ongoing-card-title">
                                  {task.title}
                                </div>
                                <div className="ongoing-card-meta">
                                  <span className="ongoing-office">
                                    {task.office}
                                  </span>
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
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : ( 
          <div className="ongoing-no-tasks">No upcoming tasks</div>
        )}
      </main>
    </div>
  );
};

export default TaskOngoing;
