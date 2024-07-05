export const sidelinks = [
  {
    menuTitle: "Sales Oders",
    subMenus: [
      { subMenuTitle: "Orders", to: "orders" },
      { subMenuTitle: "Receipts", to: "orderreceipts" },
      { subMenuTitle: "Return Order", to: "returnorder" },
      { subMenuTitle: "Order Dispatch", to: "orderdispatch" },
      { subMenuTitle: "Order Invoice", to: "orderinvoice" },

      // { subMenuTitle: "Order Receipt", to: "orderreceipt" },
      // { subMenuTitle: "GRN", to: "#" },
      { subMenuTitle: "Reports", to: "salesreport" },
    ],
  },
  {
    menuTitle: "Sales People",
    subMenus: [
      { subMenuTitle: "Sales People", to: "salespeople" },
      // { subMenuTitle: "Statement", to: "statement" },
      { subMenuTitle: "Reports", to: "salespeoplereport" },
    ],
  },
  // {
  //   menuTitle: "Customers",
  //   subMenus: [{ subMenuTitle: "Customer's statement", to: "#" }],
  // },
  // {
  //   menuTitle: "Institutions ",
  //   subMenus: [{ subMenuTitle: "Institution's Statement", to: "#" }],
  // },
];
