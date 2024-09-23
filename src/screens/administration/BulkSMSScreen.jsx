import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Bulk Group", to: "bulkmessages" },
  { pagename: "Single Custom", to: "bulkcustom" },
];
function BulkSMSScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default BulkSMSScreen;
