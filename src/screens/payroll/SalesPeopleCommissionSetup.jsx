import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Add Staff", to: "addstaffsetup" },
  { pagename: "Stff List", to: "staffsetlist" },
];

const SalesPeopleCommissionSetup = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default SalesPeopleCommissionSetup;
