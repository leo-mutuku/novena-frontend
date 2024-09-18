import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Trips", to: "allruns" },
  // { pagename: "In Transit", to: "allrunsintransit" },
  // { pagename: "Posted", to: "allpsotedruns" },
  { pagename: "New Trip ", to: "createrun" },
];
function RunHeadersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default RunHeadersScreen;
