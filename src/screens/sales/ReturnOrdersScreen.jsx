import PageActionComponent from "../../components/PageActionComponent";
const pagemenus = [
  { pagename: "All Return Order", to: "allreturnorders" },
  { pagename: "In Transit", to: "allreturnordersintransit" },
  { pagename: "Posted", to: "allpostedreturnorders" },
  { pagename: "Create Return Order", to: "createreturnorder" },
];

function ReturnOrdersScreen() {
  return (
    <>
      <PageActionComponent pagemenus={pagemenus} />
    </>
  );
}

export default ReturnOrdersScreen;
