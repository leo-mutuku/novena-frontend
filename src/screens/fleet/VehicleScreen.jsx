import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Account Entries", to: "allaccountentries" },
];
function VehicleScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default VehicleScreen;
