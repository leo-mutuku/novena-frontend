import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Routes", to: "allroutes" },
  { pagename: "Create Route", to: "createroute" },
];
function RoutesScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default RoutesScreen;
