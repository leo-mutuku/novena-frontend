import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Maintenance", to: "allmaintenance" },
  { pagename: "Create maintenance", to: "CreateMaintenance" },
];
function ManagementScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ManagementScreen;
