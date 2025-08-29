// src/components/TaskDetailComponents/SchoolStats/SchoolStats.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./SchoolStats.css";
import schoolLogo from "../../../assets/images/school-placehold.jpg";
import { IoMdCheckmark } from "react-icons/io";


// Mock data
const mockData = {
  schools: [
    {
      id: 1,
      name: "Biñan City Science & Technology High School",
      assignedTo: "Juan Dela Cruz",
      code: "BINHS-BN-0001",
      status: "submitted",
    },
    {
      id: 2,
      name: "Biñan City Senior High School - San Antonio Campus",
      assignedTo: "Maria Santos",
      code: "BINHS-BN-0002",
      status: "not_submitted",
    },
    {
      id: 3,
      name: "Biñan National High School",
      assignedTo: "Pedro Reyes",
      code: "BINHS-BN-0003",
      status: "past_due",
    },
  ],
};

// Status → Badge labels
const statusLabels = {
  submitted: (
    <span>
      <IoMdCheckmark size={14} /> Completed
    </span>
  ),
  not_submitted: "Pending",
  past_due: "Past Due",
};

const SchoolStats = () => {
  const [activeTab, setActiveTab] = useState("assigned");
  const navigate = useNavigate();

  // Calculate counts
  const counts = useMemo(() => {
    const assigned = mockData.schools.length;
    const submitted = mockData.schools.filter((s) => s.status === "submitted").length;
    const notSubmitted = mockData.schools.filter(
      (s) => s.status === "not_submitted" || s.status === "past_due"
    ).length;

    return { assigned, submitted, notSubmitted };
  }, []);

  // Filter schools by active tab
  const filteredSchools = useMemo(() => {
    if (activeTab === "assigned") return mockData.schools;
    if (activeTab === "submitted") {
      return mockData.schools.filter((s) => s.status === "submitted");
    }
    if (activeTab === "not_submitted") {
      return mockData.schools.filter(
        (s) => s.status === "not_submitted" || s.status === "past_due"
      );
    }
    return [];
  }, [activeTab]);

  // Handle click on a school card
  const handleClick = (school) => {
    navigate(`/registered-schools/${school.id}`, { state: { school } });
  };

  return (
    <div className="school-stats">
      {/* Tabs */}
      <div className="stats-tabs">
        <div
          className={`tab ${activeTab === "assigned" ? "active" : ""}`}
          onClick={() => setActiveTab("assigned")}
        >
          <div className="tab-count">{counts.assigned}</div>
          <div className="tab-label">Assigned</div>
        </div>

        <div
          className={`tab ${activeTab === "submitted" ? "active" : ""}`}
          onClick={() => setActiveTab("submitted")}
        >
          <div className="tab-count">{counts.submitted}</div>
          <div className="tab-label">Submitted</div>
        </div>

        <div
          className={`tab ${activeTab === "not_submitted" ? "active" : ""}`}
          onClick={() => setActiveTab("not_submitted")}
        >
          <div className="tab-count">{counts.notSubmitted}</div>
          <div className="tab-label">Not Submitted</div>
        </div>
      </div>

      {/* School List */}
      <div className="school-list">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="school-card"
            onClick={() => handleClick(school)}
          >
            <div className="school-header">
              <div className="school-left">
                <img src={schoolLogo} alt="school-logo" />
                <h4 className="school-name">{school.name}</h4>
              </div>
              <span className={`status-badge ${school.status}`}>
                {statusLabels[school.status]}
              </span>
            </div>
            <p className="school-assigned">Assigned to: {school.assignedTo}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolStats;