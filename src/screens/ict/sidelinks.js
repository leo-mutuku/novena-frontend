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
      { subMenuTitle: "Last In", to: "lastin", role: 9000 },
    ],
  },

  {
    menuTitle: "Bank Reconcialtion",
    subMenus: [
      { subMenuTitle: "Bank & Period ", to: "bankperiod", role: 9000 },
      {
        subMenuTitle: "Upload Bank Statement",
        to: "uploadbankstatement",
        role: 9000,
      },
      { subMenuTitle: "Validate", to: "validate", role: 9000 },
      { subMenuTitle: "Reconcile", to: "reconcile", role: 9000 },
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
