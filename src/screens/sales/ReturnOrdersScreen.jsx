import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "Create Return Order", to: "createreturnorder" },
  { pagename: "All Return Order", to: "allreturnorders" },
];

function ReturnOrdersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ReturnOrdersScreen;
