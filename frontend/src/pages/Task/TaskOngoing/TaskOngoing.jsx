// src/pages/Task/TaskOngoing/TaskOngoing.jsx
import React, { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import CreateTask from "../../../components/CreateTask/CreateTask";
import { PiClipboardTextBold } from "react-icons/pi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import "./TaskOngoing.css";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Helper: Convert date string to Date object for sorting (safe)
const parseDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== "string") {
    return new Date(0); // fallback minimal date
  }

  const parts = dateStr.split(" ");
  if (parts.length < 3) {
    return new Date(0); // invalid format, fallback
  }

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

  const monthIndex = monthNames[month];
  if (monthIndex === undefined || isNaN(parseInt(year))) {
    return new Date(0); // fallback if something's off
  }

  return new Date(parseInt(year), monthIndex, parseInt(day.replace(",", "")));
};

// ✅ Helper: Get weekday from date string
const getWeekday = (dateStr) => {
  const date = parseDate(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { weekday: "long" });
};

const TaskOngoing = () => {
  // ✅ Get pre-filtered upcoming tasks from ToDoPage layout
  const { upcomingTasks } = useOutletContext();

  // ✅ Local state for tasks (so new tasks can be added)
  const [tasks, setTasks] = useState(upcomingTasks || []);

  // ✅ Handler for new task creation
  const handleCreateTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
    toast.success("Task created successfully!");
  };

  // Group tasks by postDate
  const groupedByDate = tasks.reduce((groups, task) => {
    const date = task.postDate || "Unknown Date";
    if (!groups[date]) groups[date] = [];
    groups[date].push(task);
    return groups;
  }, {});

  // Sort dates: newest first
  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => parseDate(b) - parseDate(a)
  );

  // Track open/closed state for each date group
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
        {/* ✅ Pass fixed handler */}
        <CreateTask onTaskCreated={handleCreateTask} />

        {/* Task List Grouped by postDate */}
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

      {/* Toast Container */}
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
