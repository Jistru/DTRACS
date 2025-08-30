// src/data/focals.js
import { idFromName } from "../utils/idGenerator";
import avatar2 from '../assets/images/avatar2.png';

export const sectionData = {
  SMME: [
    {
      id: idFromName("Isidra L. Galman"),
      avatar: avatar2,
      title: "School Management Monitoring and Evaluation",
      focalPerson: "Isidra L. Galman",
      path: "task-list",
      tasklist: [
        {
          id: 1,
          office: "School Governance and Operations Division",
          status: "Upcoming",
          title: "Finalize quarterly school performance report",
          dueDate: "August 30, 2025",
          postDate: "August 22, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 2,
          assigned: 14
        },
      ],
    },
  ],

  "planning-research": [
    {
      id: idFromName("Edward R. Manuel"),
      avatar: avatar2,
      title: "Research",
      focalPerson: "Edward R. Manuel",
      path: "task-list",
      tasklist: [
        {
          id: 2,
          office: "School Governance and Operations Division",
          status: "Upcoming",
          title: "Draft survey instrument for reading comprehension study",
          dueDate: "August 30, 2025",
          postDate: "August 22, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 3,
          assigned: 12
        },
      ],
    },
    {
      id: idFromName("Charles M. Patio"),
      avatar: avatar2,
      title: "Planning",
      focalPerson: "Charles M. Patio",
      path: "task-list",
      tasklist: [
        {
          id: 3,
          office: "School Governance and Operations Division",
          status: "Upcoming",
          title: "Prepare FY 2025 Annual Implementation Plan",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 4,
          assigned: 14
        },
      ],
    },
  ],

  HRD: [
    {
      id: idFromName("Arlene P. Alora"),
      avatar: avatar2,
      title: "Human Resource Development",
      focalPerson: "Arlene P. Alora",
      path: "task-list",
      tasklist: [
        {
          id: 4,
          office: "School Governance and Operations Division",
          status: "Upcoming",
          title: "Organize teacher upskilling training on ICT integration",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 5,
          assigned: 14
        },
      ],
    },
  ],

  SMN: [
    {
      id: idFromName("Donna Jane M. Alfonso"),
      avatar: avatar2,
      title: "Social Mobilization and Networking",
      focalPerson: "Donna Jane M. Alfonso",
      path: "task-list",
      tasklist: [
        {
          id: 5,
          office: "School Governance and Operations Division",
          status: "Upcoming",
          title: "Finalize MOA with community stakeholders",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 6,
          assigned: 14
        },
        {
          id: 6,
          office: "School Governance and Operations Division",
          status: "Past Due",
          title: "Organize parent-volunteer orientation session",
          dueDate: "August 20, 2025",
          postDate: "August 10, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 8,
          assigned: 14
        },
      ],
    },
  ],

  "education-facilities": [
    {
      id: idFromName("Precious Joy A. Coronado"),
      avatar: avatar2,
      title: "Education Facilities",
      focalPerson: "Precious Joy A. Coronado",
      path: "task-list",
      tasklist: [
        {
          id: 7,
          office: "School Governance and Operations Division",
          status: "Upcoming",
          title: "Inspect ongoing classroom repair projects",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 9,
          assigned: 14
        },
        {
          id: 8,
          office: "School Governance and Operations Division",
          status: "Completed",
          title: "Update school facilities inventory database",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 14,
          assigned: 14
        },
      ],
    },
  ],

  DRRM: [
    {
      id: idFromName("Ernane S. Escuvania"),
      avatar: avatar2,
      title: "Disaster Risk Reduction and Management",
      focalPerson: "Ernane S. Escuvania",
      path: "task-list",
      tasklist: [
        {
          id: 9,
          office: "School Governance and Operations Division",
          status: "Past Due",
          title: "Update school disaster contingency plan",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 7,
          assigned: 14
        },
      ],
    },
  ],

  "school-health": [
    {
      id: idFromName("Dr. Liza M. Cruz"),
      avatar: avatar2,
      title: "Dental",
      focalPerson: "Focal_Name",
      path: "task-list",
      tasklist: [
        {
          id: 10,
          office: "School Governance and Operations Division",
          status: "Past Due",
          title: "Schedule dental check-up for Grade 1 pupils",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 5,
          assigned: 14
        },
      ],
    },
    {
      id: idFromName("Nurse Juan P. Dela Cruz"),
      avatar: avatar2,
      title: "Medical",
      focalPerson: "Focal_Name",
      path: "task-list",
      tasklist: [
        {
          id: 11,
          office: "School Governance and Operations Division",
          status: "Completed",
          title: "Administer annual health screening for students",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 14,
          assigned: 14
        },
      ],
    },
    {
      id: idFromName("Teacher Anna L. Perez"),
      avatar: avatar2,
      title: "SBFP",
      focalPerson: "Focal_Name",
      path: "task-list",
      tasklist: [],
    },
    {
      id: idFromName("Teacher Anna L. Perez"),
      avatar: avatar2,
      title: "GPP",
      focalPerson: "Focal_Name",
      path: "task-list",
      tasklist: [],
    },
    {
      id: idFromName("Teacher Anna L. Perez"),
      avatar: avatar2,
      title: "WINS",
      focalPerson: "Focal_Name",
      path: "task-list",
      tasklist: [],
    },
    {
      id: idFromName("Teacher Anna L. Perez"),
      avatar: avatar2,
      title: "NDEP",
      focalPerson: "Focal_Name",
      path: "task-list",
      tasklist: [],
    },
    {
      id: idFromName("Teacher Anna L. Perez"),
      avatar: avatar2,
      title: "RH",
      focalPerson: "Focal_Name",
      path: "task-list",
      tasklist: [],
    },
  ],

  "youth-formation": [
    {
      id: idFromName("Maureen Jane Q. Alangco"),
      avatar: avatar2,
      title: "Youth Formation",
      focalPerson: "Maureen Jane Q. Alangco",
      path: "task-list",
      tasklist: [
        {
          id: 12,
          office: "Curriculum Implementation Division",
          status: "Upcoming",
          title: "Coordinate youth volunteer clean-up drive",
          dueDate: "August 30, 2025",
          postDate: "August 20, 2025",
          dueTime: "11:59 PM",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          submitted: 10,
          assigned: 14
        },
      ],
    },
  ],
};