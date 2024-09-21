import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Vehicle Mialage Report", to: "vehicletripsummary" },
  { pagename: "Vehicle Expense Report", to: "vehicletripdetails" },
];
function TripSheetScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default TripSheetScreen;
