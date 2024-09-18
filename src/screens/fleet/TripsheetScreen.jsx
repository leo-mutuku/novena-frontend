import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Vehicle Trip Summary", to: "#" },
  { pagename: "Vehicle Trip Details", to: "#" },
];
function TripSheetScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default TripSheetScreen;
