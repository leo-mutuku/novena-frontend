import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Wages", to: "wageslist" },
  { pagename: "New Wage", to: "createwage" },
];

const WagesScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};

export default WagesScreen;
