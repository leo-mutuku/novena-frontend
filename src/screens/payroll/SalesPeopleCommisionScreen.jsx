import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Stff List", to: "staffsetlist" }];

const SalesPeopleCommisionScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default SalesPeopleCommisionScreen;
