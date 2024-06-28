export const sidelinks = [
  {
    menuTitle: "Accounts",
    subMenus: [
      { subMenuTitle: "Accounts", to: "accounts" },
      { subMenuTitle: "Account Entries", to: "allaccountentries" },
      // { subMenuTitle: "Leger Entry", to: "ledgerentry" },
    ],
  },
  {
    menuTitle: "General Ledger (gl)",
    subMenus: [{ subMenuTitle: "General ledger(gl)", to: "gl" }],
  },
  // {
  //   menuTitle: "Mpesa Accounts",
  //   subMenus: [
  //     { subMenuTitle: "Mpesa Paybills", to: "mpesapaybills" },
  //     { subMenuTitle: "Mpesa Tills", to: "mpesatills" },
  //   ],
  // },

  {
    menuTitle: "Bank Accounts",
    subMenus: [
      { subMenuTitle: "Bank Accounts", to: "bankaccounts" },
      { subMenuTitle: "Bank Acc Statement", to: "bankaccountentries" },
    ],
  },
  {
    menuTitle: "Cash Accounts",
    subMenus: [
      { subMenuTitle: "Cash Accounts", to: "cashaccounts" },
      { subMenuTitle: "Cash Acc Statement", to: "allcashaccountentries" },
    ],
  },
  {
    menuTitle: "Cash 2 Bank",
    subMenus: [{ subMenuTitle: "Cash To Bank", to: "cash2bank" }],
  },
  {
    menuTitle: "Bank 2 Cash",
    subMenus: [{ subMenuTitle: "Bank To Cash", to: "bank2cash" }],
  },
  // {
  //   menuTitle: "Fixed Asset",
  //   subMenus: [
  //     { subMenuTitle: "Cash Accounts", to: "cashaccounts" },
  //     { subMenuTitle: "Cash Account entries", to: "allcashaccountentries" },
  //   ],
  // },

  {
    menuTitle: "Financial Reports",
    subMenus: [
      { subMenuTitle: "Trial Balance", to: "trialbalance" },
      { subMenuTitle: "Profit & Loss Statement", to: "profitandlossstatement" },
      { subMenuTitle: "Balance Sheet", to: "balancesheet" },
      { subMenuTitle: "Cash Flow Analysis", to: "cashflowanalysis" },
      { subMenuTitle: "Cost of Production", to: "costofproduction" },
      { subMenuTitle: "Income Statement", to: "incomestatement" },
    ],
  },
];
