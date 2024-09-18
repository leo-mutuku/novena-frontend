import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All vehicles", to: "allvehicles" },
  { pagename: "Create Vehicle", to: "createvehicle" },
];
function VendorsScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default VendorsScreen;
