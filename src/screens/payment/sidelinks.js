export const sidelinks = [
  {
    menuTitle: "Accounts",
    subMenus: [{ subMenuTitle: "Accounts", to: "accounts" }],
  },
  {
    menuTitle: "General Ledger (gl)",
    subMenus: [{ subMenuTitle: "General ledger(gl)", to: "gl" }],
  },
  {
    menuTitle: "Mpesa Accounts",
    subMenus: [
      { subMenuTitle: "Mpesa Paybills", to: "mpesapaybills" },
      { subMenuTitle: "Mpesa Tills", to: "mpesatills" },
    ],
  },

  {
    menuTitle: "Bank Accounts",
    subMenus: [{ subMenuTitle: "Bank Accounts", to: "bankaccounts" }],
  },

  // {
  //   menuTitle: "General Journal",
  //   subMenus: [
  //     { subMenuTitle: "General Journal", to: "generaljournal" },
  //   ],
  // },
  {
    menuTitle: "Financial Reports",
    subMenus: [
      { subMenuTitle: "Trial Balance", to: "trialbalance" },
      { subMenuTitle: "Profit & Loss Statement", to: "profitandlossstatement" },
    ],
  },
];
