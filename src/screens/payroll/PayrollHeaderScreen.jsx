import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Payroll", to: "allpayroll" },
  { pagename: "In Tansit", to: "allpayrollintransit" },
  { pagename: "Posted", to: "allpostedpayroll" },
  { pagename: "New Payroll", to: "createpayroll" },
];

export const PayrollHeaderScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
