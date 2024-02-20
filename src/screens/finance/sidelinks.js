export const sidelinks = [
  {
    menuTitle: "Accounts",
    subMenus: [
      { subMenuTitle: "Accounts", to: "accounts" },
      { subMenuTitle: "Account Entries", to: "allaccountentries" },
    ],
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
    subMenus: [
      { subMenuTitle: "Bank Accounts", to: "bankaccounts" },
      { subMenuTitle: "Bank Entries", to: "allbankentries" },
    ],
  },
  {
    menuTitle: "Cash Accounts",
    subMenus: [
      { subMenuTitle: "Cash Accounts", to: "cashaccounts" },
      { subMenuTitle: "Cash Account entries", to: "allcashaccountentries" },
    ],
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
