import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Vehicle Mialage Report", to: "vehicletripsummary" },
  { pagename: "Vehicle Fuel  Report", to: "vehicletripdetails" },
  {
    pagename: "Vehicle Maintenance Report",
    to: "vehiclemaintenanceexpensereport",
  },
];
function TripSheetScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default TripSheetScreen;
