import React from "react";
import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Staff List", to: "advancestafflist" },
  { pagename: "Advance Entries", to: "advanceentries" },
  { pagename: "Rationed Deductions Entries", to: "rationdeductions" },
];

const AdvanceManagementScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
export default AdvanceManagementScreen;
