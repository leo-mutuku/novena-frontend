import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All", to: "allpaymentrequisitions" },
  { pagename: "In Progress", to: "createpaymentrequisition" },
  { pagename: "Posted", to: "createpaymentrequisition" },
  { pagename: "New", to: "createpaymentrequisition" },
  // { pagename: "Create Payment Requisition", to: "createpaymentrequisition" },
];
export const RequisitionsScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
