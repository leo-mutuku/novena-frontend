import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Payroll", to: "allpayroll" },
  { pagename: "General", to: "allpayrollintransit" },
  { pagename: "Sales", to: "allpayrollintransit" },
  { pagename: "Production", to: "allpostedpayroll" },
  { pagename: "Pack House", to: "allpostedpayroll" },
  { pagename: "New Payroll", to: "createpayroll" },
];

export const PayrollHeaderScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
