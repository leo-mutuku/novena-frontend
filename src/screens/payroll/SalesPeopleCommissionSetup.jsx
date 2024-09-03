import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Product Bale setup", to: "productbalesetup" },
  { pagename: "Add Item", to: "additem" },
];

const SalesPeopleCommissionSetup = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default SalesPeopleCommissionSetup;
