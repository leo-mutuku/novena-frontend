import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All payment Requisitions", to: "allpaymentrequisition" },
  { pagename: "Posted", to: "allpostedpaymentrequisition" },
  // { pagename: "Create Payment Requisition", to: "createpaymentrequisition" },
];
export const RequisitionsScreen = () => {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
};
