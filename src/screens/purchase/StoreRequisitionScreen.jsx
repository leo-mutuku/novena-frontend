import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Requisitions", to: "allstorerequisitions" },
  { pagename: "In Progress", to: "allinprogressrequisitions" },
  { pagename: "Posted", to: "allpostedrequisitions" },
  { pagename: "New Requisition", to: "createrequisition" },
];

function StoreRequisitionScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}
export default StoreRequisitionScreen;
