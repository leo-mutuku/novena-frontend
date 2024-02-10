import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Routes", to: "allroutes" },
  { pagename: "Create Route", to: "createroute" },
  { pagename: "Assign Driver Route", to: "assignments" },
];
function RoutesScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default RoutesScreen;
