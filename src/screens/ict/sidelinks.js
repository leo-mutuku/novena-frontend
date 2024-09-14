export const sidelinks = [
  {
    menuTitle: "BioMetric",
    subMenus: [
      { subMenuTitle: "Daily Attendance", to: "dailyattance", role: 9000 },
      { subMenuTitle: "Attendance Report", to: "attendancereport", role: 9000 },
      { subMenuTitle: "Allowed Absence", to: "allowedabsence", role: 9000 },
      {
        subMenuTitle: "Cancelled Attendance",
        to: "cancelledattendance",
        role: 9000,
      },
    ],
  },

  {
    menuTitle: "Bank Reconcialtion",
    subMenus: [
      { subMenuTitle: "Period & Bank", to: "#", role: 9000 },
      { subMenuTitle: "Upload Bank Statement", to: "#", role: 9000 },
      { subMenuTitle: "Compare & Match", to: "#", role: 9000 },
      { subMenuTitle: "Pull Unreconciled", to: "#", role: 9000 },
    ],
  },

  {
    menuTitle: "Mobile App",
    subMenus: [
      { subMenuTitle: "User ID", to: "#", role: 9999 },
      { subMenuTitle: "Daily Monitor", to: "#", role: 9999 },
      { subMenuTitle: "Revoke Access", to: "#", role: 9999 },
    ],
  },

  // {
  //   menuTitle: "Administrator",
  //   subMenus: [
  //     { subMenuTitle: "Administrator", to: "admin" },

  //   ],
  // },
];
