export const sidelinks = [
  {
    menuTitle: "Sales Oders",
    subMenus: [
      { subMenuTitle: "Orders", to: "orders" },
      { subMenuTitle: "Receipts", to: "orderreceipts" },
      { subMenuTitle: "Return Order", to: "returnorder" },
      { subMenuTitle: "Order Dispatch", to: "orderdispatch" },
      { subMenuTitle: "Order Invoice", to: "orderinvoice" },

      { subMenuTitle: "Ledger Entry", to: "#" },

      { subMenuTitle: "Detailed Item Report", to: "#" },
    ],
  },
  {
    menuTitle: "Sales People",
    subMenus: [
      { subMenuTitle: "Sales People", to: "salespeople" },
      { subMenuTitle: "Loading List", to: "loadinglist" },
      // { subMenuTitle: "Statement", to: "statement" },
      { subMenuTitle: "SP Sales Report", to: "salespeoplereport" },
      { subMenuTitle: "Detailed SP Order Report", to: "detailedsporderreport" },
      { subMenuTitle: "Detailed SP Return Report", to: "#" },
    ],
  },

  // {
  //   menuTitle: "Advanced Filter Reports",
  //   subMenus: [],
  // },
  // {
  //   menuTitle: "Customers",
  //   subMenus: [{ subMenuTitle: "Customer's statement", to: "#" }],
  // },
  // {
  //   menuTitle: "Institutions ",
  //   subMenus: [{ subMenuTitle: "Institution's Statement", to: "#" }],
  // },
];
