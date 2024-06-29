import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "New", to: "createpaymentrequisition" },
  { pagename: "All", to: "allpaymentrequisitions" },
  // { pagename: "Create Payment Requisition", to: "createpaymentrequisition" },
];
export const RequisitionsScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
