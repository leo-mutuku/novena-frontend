import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [{ pagename: "Stff List", to: "staffsetlist" }];

const PackHouseWageScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default PackHouseWageScreen;
