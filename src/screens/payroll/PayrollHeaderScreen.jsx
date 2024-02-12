import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Payroll", to: "allpayroll" },
  { pagename: "General", to: "generalcategory" },
  { pagename: "Sales", to: "salescategory" },
  { pagename: "Production", to: "productioncategory" },
  { pagename: "Pack House", to: "packHousecategory" },
  { pagename: "New Payroll", to: "createpayroll" },
];

export const PayrollHeaderScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
