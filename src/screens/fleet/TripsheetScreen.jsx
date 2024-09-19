import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Vehicle Trip Summary", to: "vehicletripsummary" },
  { pagename: "Vehicle Trip Details", to: "vehicletripdetails" },
];
function TripSheetScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default TripSheetScreen;
