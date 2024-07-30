import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Product Bale setup", to: "productbalesetup" }];

const SalesPeopleCommissionSetup = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default SalesPeopleCommissionSetup;
