import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All vehicles", to: "allvehicles" },
  { pagename: "Create Vehicle", to: "createvehicle" },
];
function FuelExpenseScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default FuelExpenseScreen;
