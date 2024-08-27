import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Running Inventory Report", to: "runninginventoryreport" },
];

function RunningInventoryReportScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default RunningInventoryReportScreen;
