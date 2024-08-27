import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All PO", to: "allstorerequisitions" },

  { pagename: "Posted", to: "allpostedrequisitions" },
  { pagename: "New PO", to: "createrequisition" },
];

function StoreRequisitionScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}
export default StoreRequisitionScreen;
