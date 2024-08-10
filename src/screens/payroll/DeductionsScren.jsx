import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Deductions", to: "deductionlist" },
  { pagename: "New Deduction", to: "createduduction" },
];

const DeductionsScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};

export default DeductionsScreen;
