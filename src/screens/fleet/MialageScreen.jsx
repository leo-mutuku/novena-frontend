import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All vehicles", to: "allvehicles" },
  { pagename: "Create Vehicle", to: "createvehicle" },
];
function MialageScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default MialageScreen;
