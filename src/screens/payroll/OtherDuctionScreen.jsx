import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Deduction Salary List", to: "deductionsalarylist" },
];

const OtherDuctionScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default OtherDuctionScreen;
