export const sidelinks = [
  {
    menuTitle: "Sales Oders",
    subMenus: [
      { subMenuTitle: "Orders", to: "orders", role: 2000 },
      { subMenuTitle: "Receipts", to: "orderreceipts", role: 2980 },
      { subMenuTitle: "Delivery", to: "orderdispatch", role: 2000 },
      { subMenuTitle: "Invoice", to: "orderinvoice", role: 2000 },
      { subMenuTitle: "Return Order", to: "returnorder", role: 2000 },
      { subMenuTitle: "Sales Expense", to: "salesexpense", role: 2000 },

      // { subMenuTitle: "Detailed Item Report", to: "#" },
    ],
  },
  {
    menuTitle: "Sales People",
    subMenus: [
      { subMenuTitle: "Sales People", to: "salespeople", role: 2000 },
      { subMenuTitle: "Loading List", to: "loadinglist", role: 2000 },
      {
        subMenuTitle: "Sales bank Receipt Reports",
        role: 2000,
        to: "salesbankreceiptreport",
      },
      { subMenuTitle: "SP Sales Report", to: "salespeoplereport", role: 2000 },
      {
        subMenuTitle: "Detailed SP Order Report",
        to: "detailedsporderreport",
        role: 2000,
      },
    ],
  },
];
