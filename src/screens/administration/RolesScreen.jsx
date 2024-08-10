import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Roles", to: "allroles" },
  { pagename: "Create Role", to: "createrole" },
];
function RolesScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default RolesScreen;
