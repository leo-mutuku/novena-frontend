import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Add Deduction", to: "addstaffsetup" },
  { pagename: "Remove Deduction", to: "staffsetlist" },
];

const OtherDuctionScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default OtherDuctionScreen;
