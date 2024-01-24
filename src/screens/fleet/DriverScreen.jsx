import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Drivers", to: "alldrivers" },
  { pagename: "Create Driver", to: "createdriver" },
];
function DriverScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default DriverScreen;
