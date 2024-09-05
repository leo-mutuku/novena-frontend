export const sidelinks = [
  {
    menuTitle: "Sales Oders",
    subMenus: [
      { subMenuTitle: "Orders", to: "orders" },
      { subMenuTitle: "Receipts", to: "orderreceipts" },
      { subMenuTitle: "Delivery", to: "orderdispatch" },
      { subMenuTitle: "Invoice", to: "orderinvoice" },
      { subMenuTitle: "Return Order", to: "returnorder" },
      { subMenuTitle: "Sales Expense", to: "salesexpense" },

      { subMenuTitle: "Ledger Entry", to: "#" },

      // { subMenuTitle: "Detailed Item Report", to: "#" },
    ],
  },
  {
    menuTitle: "Sales People",
    subMenus: [
      { subMenuTitle: "Sales People", to: "salespeople" },
      { subMenuTitle: "Loading List", to: "loadinglist" },
      {
        subMenuTitle: "Sales bank Receipt Reports",
        to: "salesbankreceiptreport",
      },
      { subMenuTitle: "SP Sales Report", to: "salespeoplereport" },
      { subMenuTitle: "Detailed SP Order Report", to: "detailedsporderreport" },
      // { subMenuTitle: "Detailed SP Return Report", to: "#" },
    ],
  },
];
